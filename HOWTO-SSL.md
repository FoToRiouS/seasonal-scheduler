# Configuração de Certificado SSL Grátis (Let's Encrypt) com Nginx no Docker

Este guia instrui o passo a passo completo para configurar um certificado SSL gratuito da Let's Encrypt para o domínio `animeschedul.vps.webdock.cloud` em uma instalação limpa do Ubuntu.

A arquitetura utilizada roda o **Nginx em Docker**, mantendo o **Certbot** completamente isolado (fora do `docker-compose.yml` principal) e utilizando mapeamento direto de pastas locais (*bind mounts*) no host para persistência dos certificados.

---

## Passo 1: Criar as pastas de estrutura no Host

Antes de iniciar os containers, crie as pastas no terminal do seu Ubuntu que servirão para armazenar os certificados definitivos e os arquivos de desafio do Certbot:

```bash
sudo mkdir -p /certificate/letsencrypt
sudo mkdir -p /certificate/certbot
```

## Passo 2: Configurar os volumes no `docker-compose.yml`

No arquivo `docker-compose.yml` localizado em `~/git/seasonal-scheduler`, certifique-se de que o serviço do Nginx mapeia diretamente as pastas criadas no host para dentro do container:

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:latest  # Ou a imagem que você utiliza no projeto
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - /certificate/letsencrypt:/etc/letsencrypt:ro
      - /certificate/certbot:/var/www/certbot:ro
    restart: always

  # Seus outros serviços da aplicação (Ex: scheduler-front, scheduler-back...)
```

## Passo 3: Preparar o `nginx.conf` para a validação (Apenas HTTP)

O Nginx recusa iniciar se os arquivos `.pem` do SSL não existirem fisicamente na pasta `/certificate/letsencrypt`. Para resolver esse dilema, precisamos iniciar o Nginx apenas na porta 80 primeiro.

Abra o seu `nginx.conf` e comente todo o bloco do server da porta 443. Mantenha ativo apenas o bloco da porta 80 e a rota do desafio:

```nginx
server {
    listen 80;
    server_name animeschedul.vps.webdock.cloud;

    # Necessário para validação e renovação do Certbot via webroot
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# server {
#     listen 443 ssl;
#     server_name animeschedul.vps.webdock.cloud;
#     ssl_certificate /etc/letsencrypt/live/animeschedul.vps.webdock.cloud/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/animeschedul.vps.webdock.cloud/privkey.pem;
#     ...
# }
```

## Passo 4: Inicializar o Nginx em modo HTTP

Suba o container do Nginx para que ele comece a responder requisições na porta 80:

```bash
cd ~/git/seasonal-scheduler
docker compose up -d nginx
```

## Passo 5: Gerar o Certificado SSL via `docker run`

Com a porta 80 ativa e a rota `.well-known/acme-challenge/` apontando corretamente para o diretório compartilhado, execute o container oficial do Certbot em modo isolado para obter os certificados:

```bash
docker run --rm -it \
  -v /certificate/letsencrypt:/etc/letsencrypt \
  -v /certificate/certbot:/var/www/certbot \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email seu-email@exemplo.com \
  --agree-tos \
  --no-eff-email \
  -d animeschedul.vps.webdock.cloud
```

> **Nota:** Substitua `seu-email@exemplo.com` por um e-mail válido para receber alertas caso haja algum problema de expiração.

Ao finalizar com sucesso, os certificados reais estarão salvos na pasta `/certificate/letsencrypt/live/animeschedul.vps.webdock.cloud/`.

## Passo 6: Ativar a configuração de produção do SSL no Nginx

Agora que as chaves públicas e privadas existem no servidor:

1. Abra o arquivo `nginx.conf` novamente.
2. Remova todos os comentários do bloco da porta 443, ativando o SSL e os proxies para os containers internos da sua aplicação (`scheduler-front` e `scheduler-back`).
3. Force o Nginx a reler as configurações aplicando um reload suave:

```bash
docker compose exec nginx nginx -s reload
```

O ambiente agora está seguro e rodando sob HTTPS ([https://animeschedul.vps.webdock.cloud](https://animeschedul.vps.webdock.cloud)).

## Passo 7: Automatizar a renovação (Script + Cron)

Os certificados da Let's Encrypt duram 90 dias. Para garantir que eles renovem sozinhos, criaremos uma tarefa automatizada no Ubuntu.

1. Crie o arquivo de script responsável por rodar o Certbot e reiniciar o Nginx:
   ```bash
   sudo nano /opt/renew_cert.sh
   ```

2. Adicione o seguinte conteúdo ao script (substitua `/home/ubuntu/` pelo caminho absoluto do seu usuário caso não utilize o padrão "ubuntu"):
   ```bash
   #!/bin/bash

   # 1. Executa a checagem de renovação silenciosa usando as pastas mapeadas do host
   docker run --rm \
     -v /certificate/letsencrypt:/etc/letsencrypt \
     -v /certificate/certbot:/var/www/certbot \
     certbot/certbot renew --quiet

   # 2. Entra no diretório onde está localizado o projeto
   cd /home/ubuntu/git/seasonal-scheduler

   # 3. Recarrega o Nginx de forma não interativa (-T) para aplicar o certificado atualizado
   docker compose exec -T nginx nginx -s reload
   ```

3. Atribua permissões de execução ao script:
   ```bash
   sudo chmod +x /opt/renew_cert.sh
   ```

4. Agende a execução do script no Cron do sistema operacional:
   ```bash
   sudo crontab -e
   ```

5. Adicione a linha abaixo na última linha do arquivo (isso configurará a verificação para rodar de forma automática toda segunda-feira às 3:00 da manhã):
   ```cron
   0 3 * * 1 /opt/renew_cert.sh > /dev/null 2>&1
   ```

---

## Comandos Úteis de Verificação

Se precisar verificar se o agendador está correto ou testar o processo manualmente:

- **Listar certificados instalados:**
  ```bash
  ls -l /certificate/letsencrypt/live/animeschedul.vps.webdock.cloud/
  ```

- **Testar o script de renovação manualmente:**
  ```bash
  sudo /opt/renew_cert.sh
  ```

- **Verificar o log do cron (se necessário):**
  ```bash
  sudo tail -f /var/log/syslog | grep crond
  ```

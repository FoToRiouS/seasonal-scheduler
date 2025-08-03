package apps.schedulerback.config;

import apps.schedulerback.service.JwtSecurityService;
import apps.schedulerback.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    final JwtSecurityService jwtSecurityService;

    final UserService userService;

    public JwtAuthenticationFilter(JwtSecurityService jwtSecurityService, UserDetailsService userDetailsService, UserService userService) {
        this.jwtSecurityService = jwtSecurityService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        var token = recoverToken(request);
        if (token != null) {
            var userId = jwtSecurityService.validateToken(token);
            if (userId.isEmpty()) {
                filterChain.doFilter(request, response);
                return;
            }
            UserDetails user = userService.findById(UUID.fromString(userId));

            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
}

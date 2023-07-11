package apps.schedulerback.model.enums;

public enum Seasons {

    winter("winter", "Inverno"),
    spring("spring", "Primavera"),
    summer("summer", "Verão"),
    fall("fall", "Outono");

    private final String id;

    private final String name;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    Seasons(String id, String name) {
        this.id = id;
        this.name = name;
    }
}

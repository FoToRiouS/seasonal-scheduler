import { SeasonMAL } from "@/interfaces/AnimeMAL";

export function getSeasonInPortuguese(animeSeason: SeasonMAL) {
    switch (animeSeason) {
        case "summer":
            return "Verão";
        case "winter":
            return "Inverno";
        case "fall":
            return "Outono";
        case "spring":
            return "Primavera";
    }
}

export function getCurrentSeason(): SeasonMAL {
    const month = new Date().getMonth();
    if (month === 12 || (month >= 1 && month <= 2)) {
        return "winter";
    } else if (month >= 3 && month <= 5) {
        return "spring";
    } else if (month >= 6 && month <= 8) {
        return "summer";
    } else {
        return "fall";
    }
}

export function getDayOfExhibition(day: string, hour: string) {
    const days = new Map<string, string>();
    days.set("monday", "segunda");
    days.set("tuesday", "terça");
    days.set("wednesday", "quarta");
    days.set("thursday", "quinta");
    days.set("friday", "sexta");
    days.set("saturday", "sábado");
    days.set("sunday", "domingo");

    const daysIndex = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let dayIndex = daysIndex.indexOf(day);

    let newHour = hour;

    const hourSplit = hour ? hour.split(":") : ["00", "00"];

    const oldDate = new Date();
    oldDate.setHours(+hourSplit[0], +hourSplit[1]);

    const newDate = new Date(oldDate);
    newDate.setTime(oldDate.getTime() - 12 * 60 * 60 * 1000);

    if (oldDate.getDay() != newDate.getDay()) {
        dayIndex = dayIndex == 0 ? 6 : dayIndex - 1;
        newHour = newDate.getHours() + ":" + ("0" + newDate.getMinutes()).slice(-2);
    }

    return days.get(daysIndex[dayIndex]) + " as " + newHour;
}

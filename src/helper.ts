const formatFr = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    // day: "numeric",
});

export function formatDate(date: Date) {
    return formatFr.format(date)
}

export function calculateAge(birthDate: Date, deathDate: Date = new Date() || undefined): number {
    const today = new Date();
    let age = deathDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = deathDate.getMonth() - birthDate.getMonth();
    
    // If birthday hasn't occurred this year yet, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

export function joinWithEt(items: string[]): string {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return items.join(" et ");
    
    const allButLast = items.slice(0, -1);
    const last = items[items.length - 1];
    return allButLast.join(", ") + " et " + last;
}

const RegionName = new Intl.DisplayNames(["fr"], {type: "region"})

export function getRegionNames(region: string): string {
    return RegionName.of(region) || region;
}
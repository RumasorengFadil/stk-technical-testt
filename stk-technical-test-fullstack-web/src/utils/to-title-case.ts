export function toTitleCase(text: string): string {
    return text
        ?.toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}
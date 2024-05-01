export function generateSlug(title: string) {
    if (title) {
        return title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
    }
}
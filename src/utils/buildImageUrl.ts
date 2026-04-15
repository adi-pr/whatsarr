export default function buildImageUrl(imageUrl: string, applicationUrl: string): string {
    /**
     * This function checks if the provided imageUrl is already an absolute URL (starts with http:// or https://).
     * If it is, it returns the imageUrl as is.
     * If it's a relative URL (starts with '/'), it prepends the applicationUrl to construct the full URL.
     */
    if (/^https?:\/\//i.test(imageUrl)) {
        return imageUrl;
    }

    if (applicationUrl && imageUrl.startsWith('/')) {
        return `${applicationUrl.replace(/\/$/, '')}${imageUrl}`;
    }

    return imageUrl;
}
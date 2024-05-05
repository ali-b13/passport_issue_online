export function formatDate(date) {
    // Ensure date is a Date object
    if (!(date instanceof Date)) {
        throw new Error('Invalid Date object');
    }
    
    // Get year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    
    // Return formatted date string (e.g., "YYYY-MM-DD")
    return `${year}-${month}-${day}`;
}
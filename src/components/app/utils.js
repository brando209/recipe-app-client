export const formatDuration = (duration) => {
    let durationString = '';
    if(duration?.days > 0) durationString += `${duration.days} days `;
    if(duration?.hours > 0) durationString += `${duration.hours} hour `;
    if(duration?.minutes > 0) durationString += `${duration.minutes} minute `;
    return durationString;
}
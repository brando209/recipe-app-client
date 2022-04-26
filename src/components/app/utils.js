export const formatDuration = (duration) => {
    let durationString = '';
    if(duration?.days > 0) durationString += `${duration.days} days `;
    if(duration?.hours > 0) durationString += `${duration.hours} hour `;
    if(duration?.minutes > 0) durationString += `${duration.minutes} minute `;
    return durationString;
}

export const toMinutes = (duration) => {
    let minutes = 0;
    if(duration?.minutes > 0) minutes += duration.minutes;
    if(duration?.hours > 0) minutes += duration.hours * 60;
    if(duration?.days > 0) minutes += duration.days * 60 * 24;
    return minutes;
}
function getMilliSeconds(time) {
    time = time.split(':').reverse();
    let res = 0;
    let multipliers = [1000*60, 1000*60*60, 1000*60*60*24, 1000*60*60*24*7]
    for(let i = 0; i < time.length; i++) {
        res += multipliers[i]*time[i];
    }
    return res;
}

function getDate(s) {
    s = s.split(' ');
    time = getMilliSeconds(s[0]);
    time += s[1] == 'PM' ? 1000*60*60*12 : 0;
    let y = '20'+s[2].split('/')[2];
    let m = s[2].split('/')[1]-1;
    let d = s[2].split('/')[0];
    return new Date(new Date(y, m, d).getTime()+time);
}

module.exports = {getMilliSeconds, getDate};
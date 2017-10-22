export default function(e) {
    if(typeof(e.preventDefault) !== 'undefined') e.preventDefault();
    if(typeof(e.stopPropagation) !== 'undefined') e.stopPropagation();
}
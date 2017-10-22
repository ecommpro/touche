;(function() {

  function template(el, replacements, queryElements) {
    replacements = replacements || {};
    queryElements = queryElements || {};

    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    var template = el.innerHTML;

    for (var key in replacements) {
      template = template.replace(new RegExp('{' + key + '}', 'g'), replacements[key]);
    }

    var wrapper = document.createElement('div');
    wrapper.innerHTML = template;

    var queriedElements = {
      _: wrapper.childNodes[1]
    };

    for (var key in queryElements) {
      var el = wrapper.querySelector(queryElements[key]);
      queriedElements[key] = el;
    }

    return {
      template: template,
      elements: queriedElements
    }
  }

  window.Example = function(title, options, _ex) {

    options = options || {};
    _ex = _ex || {}
    
    if (typeof(options) === 'string') {
      options = {
        code: options
      }
    }
    
    var containerId = options.containerId || 'examples';

    var code = options.code;
    if (!code) {
      code = title.toLowerCase().replace(/[^a-zA-Z0-9_]+/g, '-');
    }
    var className = options.class || '';
    var explanation = options.desc || '';
    var explanationClass = options.desc ? "" : "hide"
    
    var ex = template('#template-example', {
      title: title,
      explanation: explanation,
      "explanation-class": explanationClass,
      code: code,
      class: className
    },
    {
      el: '.touchable',
      outer: '.block-content'
    });

    _ex.elements = ex.elements
    
    document.getElementById(containerId).appendChild(ex.elements._);

    return ex.elements.el;
  }
  
})();
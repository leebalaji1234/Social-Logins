var Manager;

(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      // solrUrl: 'http://reuters-demo.tree.ewdev.ca:9090/reuters/'
      // If you are using a local Solr instance with a "reuters" core, use:
      // solrUrl: 'http://localhost:8983/solr/reuters/'
      solrUrl: 'http://52.76.35.222:8983/solr/core.nutch.skos/'
    });

    Manager.addWidget(new AjaxSolr.ResultWidget({
      id: 'result',
      target: '#docs'
    }));

    Manager.addWidget(new AjaxSolr.PagerWidget({
      id: 'pager',
      target: '#pager',
      prevLabel: '&lt;',
      nextLabel: '&gt;',
      innerWindow: 1,
      renderHeader: function (perPage, offset, total) {
        $('#pager-header').html($('<span></span>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
      }
    }));
    
     var fields = [ 'title', 'url', 'content' ];
    for (var i = 0, l = fields.length; i < l; i++) {
      Manager.addWidget(new AjaxSolr.TagcloudWidget({
        id: fields[i],
        target: '#' + fields[i],
        field: fields[i]
      }));
    }
    
    Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
      id: 'currentsearch',
      target: '#selection'
    }));
    
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'text',
      target: '#search',
      fields: [ 'title', 'url', 'content' ]
    }));
    
    Manager.init();
    Manager.store.addByValue('q', '*:*');
    var params = {
      facet: true,
      'facet.field': [ 'title', 'url', 'content' ], // 'tstamp', 'id', 'title', 'url', 'segment', 'boost', 'digest', 'content'
      'facet.limit': 20,
      'facet.mincount': 1,
    };
    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
    Manager.doRequest();
  });

  $.fn.showIf = function (condition) {
    if (condition) {
      return this.show();
    }
    else {
      return this.hide();
    }
  }
  
  

})(jQuery);

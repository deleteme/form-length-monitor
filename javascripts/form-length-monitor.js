// example usage
// monitoring the count of the meta keywords and description fields
//   new FormLengthMonitor($$('form input[id$=meta_description]')[0], $$('form label[for$=meta_description] span')[0], {original: 'red', warning: 'blue', max: 'green'});
//   new FormLengthMonitor($$('form input[id$=meta_keywords]')[0], $$('form label[for$=meta_keywords] span')[0]);

// Used to update a DOM element with the length of a field
// The maxlength is determined by the maxlength attribute on the field element
var FormLengthMonitor = Class.create({
  
  initialize: function(field, monitor, colors){
    if (!$(field) || !$(monitor)) return;
    this.field = $(field);
    this.monitor = $(monitor);
    this.colors = colors || {
      original: '#8bb340',
      warning: '#f97c11',
      max: '#f00'
    };
    this.state = "original";
    this.threshhold = 20;
    this.maxlength = this.field.readAttribute('data-maxlength');
    this.update();
    this.field.observe('keyup', this.update.bind(this));
    this.setColor();
  },
  
  update: function(){
    this.length = $F(this.field).length;
    this.monitor.update(this.length);
    this.checkLength();
  },
  
  checkLength: function(){
    if (this.length < this.maxlength) {
      var newState = (this.length < this.maxlength - this.threshhold)? "original" : "warning";
    } else {
      var newState = "max";
    }

    if (newState != this.state){
      this.state = newState;
      this.setColor();
    }
    
  },

  setColor: function(){
    this.monitor.setStyle({ color: this.colors[this.state] });
  }
  
});

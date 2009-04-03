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
    this.maxlength = this.field.readAttribute('maxlength');
    this.update();
    this.field.observe('keyup', this.update.bind(this));
  },
  
  update: function(){
    this.length = $F(this.field).length;
    this.monitor.update(this.length);
    this.checkLength();
  },
  
  checkLength: function(){
    if (this.length < this.maxlength - 20) {
      this.monitor.setStyle({ color: this.colors.original });
    } else if ((this.length > this.maxlength - 20) && (this.length != this.maxlength)) {
      this.monitor.setStyle({ color: this.colors.warning });
    } else if (this.length == this.maxlength) {
      this.monitor.setStyle({ color: this.colors.max });
    }
  }
  
});

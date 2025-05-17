/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('navigationgraph',{
  init:function(){
      this.el.addEventListener('reloadNavHosts',function(evt){
      
      
      var currNavHostGroup=document.getElementById(evt.detail.currNavHosts);
      currNavHostGroup.setAttribute("scale","0 0 0");
      var newNavHostGroup=document.getElementById(evt.detail.newNavHosts);
      newNavHostGroup.setAttribute("scale","1 1 1");
    });
  }
});
AFRAME.registerComponent('navhost',{
  schema:{
    linkto:{type:"string",default:""},
    NavHostGroup:{type:"string",default:""}
  },
  init:function(){
    
    //add image source ke navigationgraph
    this.el.setAttribute("src","#navigationgraph");
    //add icon supaya ngeliat kamera terus terusan
    this.el.setAttribute("look-at","#cam");
    var data=this.data;
    
    this.el.addEventListener('click',function(){
      //set skybox gambar
      var sky=document.getElementById("skybox");
      sky.setAttribute("src",data.linkto);
      
      var NavHostComp=document.getElementById("NavHosts");
      var currNavHosts=this.parentElement.getAttribute("id");
      //Event buat ganti komponen di Navhosts 
      NavHostComp.emit('reloadNavHosts',{newNavHosts:data.NavHostGroup,currNavHosts:currNavHosts});
    });
  }
});

AFRAME.registerComponent('set-image', {
    schema: {
      on: {type: 'string'},
      target: {type: 'selector'},
      src: {type: 'string'},
      dur: {type: 'number', default: 300} /* awalnya 300 */
    },
  
    init: function () {
      var data = this.data;
      var el = this.el;
  
      this.setupFadeAnimation();
  
      el.addEventListener(data.on, function () {
        // Fade out image.
        data.target.emit('set-image-fade');
        // Wait for fade to complete.
        setTimeout(function () {
          // Set image.
          data.target.setAttribute('material', 'src', data.src);
        }, data.dur);
      });
    },
  
    /**
     * Setup fade-in + fade-out.
     */
    setupFadeAnimation: function () {
      var data = this.data;
      var targetEl = this.data.target;
  
      // Only set up once.
      if (targetEl.dataset.setImageFadeSetup) { return; }
      targetEl.dataset.setImageFadeSetup = true;
  
      // Create animation.
      targetEl.setAttribute('animation__fade', {
        property: 'material.color',
        startEvents: 'set-image-fade',
        dir: 'alternate',
        dur: data.dur,
        from: '#FFF',
        to: '#000'
      });
    }
  });
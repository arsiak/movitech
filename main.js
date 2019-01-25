
/*
This method will initialize each slider instance.
*/
function slider(container, nav){
    this.container=container;
    this.nav=nav;
	this.imgs=this.container.find('.slides'); // Returns jQuery object containing all matched elements.
    console.log('Value of this.imgs is : '+this.imgs);
	this.width=this.imgs[0].width;
	console.log('Value of width is : '+this.width);
	this.imgLen=this.imgs.length; // Returns the total number of sliding elements.
	/* 	Initialize the "current" counter. 
		This counter keeps track of the index of current slide in the unordered list of elements. 
		This will be used for calculating the required displacement.
	*/
	this.current=0; 
}

// This method will apply the needed animation and displacement.
slider.prototype.transition=function(coords){
	this.container.animate({
		'margin-left': coords || -(this.current*this.width+35*this.current) // First element is multiplied by Zero. The number 35 is the actual gap between two slides.
	},500);
};

// This method will set the "current" counter to next position.
slider.prototype.setCurrentPos=function(dir){
	var pos=this.current;
	console.log('Value of this.value is : '+dir);
	// It'll check which button is pressed and accordingly increments or decrements the 'pos' variable.
	pos+= ~~(dir=='next') || -1; // You can use alternate "Math.floor()" method instead of double tilde (~~) operator.
	this.current=(pos<0)?this.imgLen-3: pos%(this.imgLen-2);
	console.log(this.current);
	
};





















// 
$(document).ready(function () {
    // creating a container variable to hold the 'UL' elements. It uses method chaining.
    var container=$('.scroll-pics')
                                .css('overflow','hidden')
                                .children('ul');
    console.log(container);
    
    // Creating the 'slider' instance which will set initial parameters for the Slider.
    var sliderobj= new slider(container, $('.slider-nav'));

    console.log(sliderobj);
    /*
    This will trigger the 'setCurrentPos' and 'transition' methods on click of any button
     "data-dir" attribute associated with the button will determine the direction of sliding.
    */
    sliderobj.nav.find('button').on('click', function(){
        sliderobj.setCurrentPos($(this).data('dir'));
        sliderobj.transition();
    });
    
});

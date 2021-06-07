let _width = $(window).width();
let _height = $(window).height();
let width = 0.9 * _width;
let height = 0.96 * _height;
let ratio = 16/9;
let img_width = 0.45 * width;
let img_padding = img_width / 5;
let img_height = img_width * ratio;

if(img_height >= 0.5 * height){
    img_height = 0.5 * height;
    img_width = img_height / ratio;
    img_padding = img_width / 5;
}

let sel_img_width = 1.1 * img_width;
let sel_img_height = 1.1 * img_height;
let img_bottom = sel_img_height;

let text_width = 0.8 * width;

let data_path = "./assets/acg.csv";
let image_path = "./assets/image/";
let background_path = "./assets/background/";
let extra_path = "./assets/extra/";

let titles, texts;

var now = 2;
const _x = function(i){
    return (width / 2 - sel_img_width / 2) + (i - now) * (img_width + img_padding);
}
const _width_ = function(i){
    return i == now? sel_img_width : img_width;
}
const _height_ = function(i){
    return i == now? sel_img_height : img_height;
}

function playPause() {
    let button = document.getElementById('button');
    let music = document.getElementById('music');
    if (music.paused){
        music.play();
        button.style.animation = 'turn 2.5s linear infinite';
    }
    else{
        music.pause();
        button.style.animation = 'none 0s ease 0s 1 normal none running';
    }
}

function draw_background(fname){
    let file_path = background_path + fname;
    d3.select('body')
        .style('background-image', `url(${file_path})`)
        .style('background-repeat', 'no-repeat')
        .style('background-size', 'cover')
        .style('background-position', 'center left')
        .style('background-attachment', 'scroll');
}

function generate_text(d, texts){
    texts.html('<center id=\'title\' style=\"font-size: 0.75rem;\">'+d['name']+'</center>'+d['description']
                +'<br><center><img src="'+extra_path+d['resource']+'" style="width: 70%" /></center>');
}

function draw_images(data){
    console.log(data.length);
    let svg = d3.select('#container')
        .select('svg');
    let group = svg.selectAll('image')
        .data(data)
        .join('image')
        .attr('width', d => _width_(d.index))
        .attr('height', d => _height_(d.index))
        .attr('x', d => _x(d.index))
        .attr('y', d => img_bottom - _height_(d.index))
        .attr('xlink:href', d => image_path + d['path']);
    
    let selected = data[now];
    generate_text(selected, texts);
    draw_background(selected['background']);

    group.on('click', (e,d) => {
        let del = Math.abs(now - d.index);
        now = d.index;
        group.transition()
            .ease(Math.sqrt)
            .duration(del * 200)
            .attr('width', d => _width_(d.index))
            .attr('height', d => _height_(d.index))
            .attr('x', d => _x(d.index))
            .attr('y', d => img_bottom - _height_(d.index));
        
        generate_text(d, texts);
        draw_background(d['background']);
    }); 
    
    let images = new Array();
    for(let i = 0; i < data.length; ++i){
        let d = data[i]['background'];
        images[i] = new Image();
        images[i].src = background_path + d;
    }
}

function main(){
    let padding = {'left': 0.05*width, 'bottom': 0.1*height, 'top': 0.05*height, 'right': 0.05*width};
	let svg = d3.select('#container')
		.select('svg')
		.attr('width', width)
		.attr('height', height)
        .attr('transform', `translate(${padding.left}, ${padding.top})`);
    under = d3.select('#under')
        .style('top', padding.top + img_height + 'px');
    texts = d3.select('#desc')
        .style('width', text_width + 'px')
        .style('left', padding.left + (width - text_width) / 2 + 'px')
        .style('top', padding.top + img_height + 10 + 'px')
        .style('height', height - (padding.top + img_height)+ 'px');
        
    d3.csv(data_path).then(data => {
        now = Math.floor(data.length / 2);
        for(let i = 0; i < data.length; ++i)
            data[i].index = i;
        draw_images(data);
    });
}

main();
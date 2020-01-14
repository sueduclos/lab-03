'use strict';
let filterKeywords = [];
Animal.allAnimals = [];

function Animal(animal) {
  this.title = animal.title;
  this.image_url = animal.image_url;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  if (!filterKeywords.includes(this.keyword)) {
    filterKeywords.push(this.keyword);
  }
}

Animal.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let animalClone = $('div[class="clone"]');

  let animalHtml = $('#photo-template').html();

  animalClone.html(animalHtml);

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr('src', this.image_url);
  animalClone.find('#description').text(this.description);
  animalClone.find('#keyword').text(this.keyword);
  animalClone.find('#horns').text(this.horns);
  animalClone.removeClass('clone');
  animalClone.attr('class', this.keyword);
};

Animal.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(page1 => {
      page1.forEach(item => {
        Animal.allAnimals.push(new Animal(item));
      });
    })
    .then(Animal.loadAnimals)
    .then(Animal.createFilter);
};

Animal.loadAnimals = () => {
  Animal.allAnimals.forEach(animal => animal.render());
};

$(() => Animal.readJson());

Animal.createFilter = () => {
  for(let i = 0; i < filterKeywords.length; i++) {
    let keyword = filterKeywords[i];
    $('select').append(`<option>${keyword}</option>`);
  }

};

$('select').on('change', (event) => {
  let keyword = event.target.value;
  $('div').hide();
  $(`div[class="${keyword}"]`).fadeIn();
} 
);
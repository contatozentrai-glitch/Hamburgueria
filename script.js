const products = document.querySelector('#products');
const menu = {
 burgers: {name:'Hambúrgueres', description:'Seis jeitos de encontrar a sua próxima mordida favorita.', items:[
 ['Brasa Clássico','Pão de gergelim, burger bovino de 160 g, cheddar, alface, tomate e maionese da casa.',29.9,0,'O clássico da casa'],
 ['Duplo da Brasa','Dois smash burgers de 90 g, cheddar em dobro, picles e molho da casa no brioche.',36.9,1,'Queijo em dobro'],
 ['Bacon de Respeito','Burger bovino de 160 g, cheddar, bacon crocante e barbecue no pão brioche.',38.9,2,'Para os fãs de bacon'],
 ['Cebola & Brasa','Burger bovino de 160 g, provolone, cebola caramelizada e maionese de alho.',35.9,3,'Doce na medida'],
 ['Frango Crocante','Frango empanado, alface, picles e maionese de limão no pão brioche.',32.9,4,'Crocância a cada mordida'],
 ['Verde da Casa','Burger de grão-de-bico, rúcula, tomate e maionese de ervas no pão de gergelim.',31.9,5,'Vegetariano']
 ]},
 combos: {name:'Combos',description:'Seu burger favorito, uma porção de fritas e algo gelado. A combinação está pronta.',items:[
 ['Combo Clássico','Um Brasa Clássico + fritas individuais de 120 g + refrigerante em lata de 350 ml.',44.9,6,'Para uma pessoa'],
 ['Dupla de Respeito','Dois Brasa Clássicos + fritas de 240 g para compartilhar + dois refrigerantes de 350 ml.',84.9,7,'Para duas pessoas'],
 ['Combo Brasa Completo','Um Duplo da Brasa + fritas com cheddar e bacon de 180 g + limonada de 400 ml.',56.9,8,'Fome grande']
 ]},
 sides: {name:'Acompanhamentos',description:'No meio da mesa ou só pra você. A gente entende os dois lados.',items:[
 ['Fritas da Casa','Batatas douradas e crocantes, finalizadas com sal. A companhia que nunca erra.',14.9,9,'Porção de 120 g'],
 ['Fritas Cheddar & Bacon','Batatas cobertas com molho de cheddar cremoso e pedacinhos de bacon crocante.',24.9,10,'Porção de 180 g'],
 ['Anéis de Cebola','Anéis de cebola empanados e dourados, com maionese da casa para acompanhar.',19.9,11,'10 unidades'],
 ['Palitos de Queijo','Muçarela empanada por fora, derretida por dentro. Servida com molho de tomate.',23.9,12,'6 unidades']
 ]},
 drinks: {name:'Bebidas',description:'Geladas, refrescantes ou cremosas. Escolha como acompanhar seu burger.',items:[
 ['Refrigerantes','Cola, guaraná ou limão. Opções tradicionais e zero açúcar.',7.9,13,'Lata · 350 ml'],
 ['Limonada da Casa','Limão, água, gelo e um toque de hortelã. Frescor do primeiro ao último gole.',12.9,14,'Copo · 400 ml'],
 ['Shake de Chocolate','Sorvete de chocolate batido com leite, calda de chocolate e chantilly.',21.9,15,'Copo · 400 ml']
 ]}
};
const currency=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
function renderCategory(category){
 const group=menu[category];
 document.querySelector('#category-description').textContent=group.description;
 document.querySelector('#category-count').textContent=String(group.items.length).padStart(2,'0')+' opções';
 products.setAttribute('aria-labelledby','tab-'+category);
 products.innerHTML=group.items.map(([name,description,price,photo,tag])=>`<article class="product"><div class="product-image menu-photo" role="img" aria-label="Imagem ilustrativa de ${name}" style="--photo-x:${(photo%4)*100/3}%;--photo-y:${Math.floor(photo/4)*100/3}%"></div><div class="product-copy"><span class="item-note">${tag}</span><h3>${name}</h3><p>${description}</p><div class="product-bottom"><strong>${currency.format(price)}</strong></div></div></article>`).join('');
}
const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectCategory(category){
 tabs.forEach(tab=>{const selected=tab.dataset.category===category;tab.classList.toggle('active',selected);tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1});
 renderCategory(category);
}
tabs.forEach((tab,index)=>{
 tab.id='tab-'+tab.dataset.category;
 tab.setAttribute('aria-controls','products');
 tab.addEventListener('click',()=>selectCategory(tab.dataset.category));
 tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();tabs[next].focus();tabs[next].click()}});
});
document.querySelectorAll('[data-show-category]').forEach(link=>link.addEventListener('click',()=>selectCategory(link.dataset.showCategory)));
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.header nav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu')}));
selectCategory('burgers');

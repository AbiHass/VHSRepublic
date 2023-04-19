const productsData = [
{
    id: 1,
    name:'Tiburón (1975)', 
    director: 'Steven Spielberg',
    price: 3, 
    category: 'Horror',
    img: './img/tiburon.jpg',
},
{
    id: 2,
    name: 'Psicosis (1960)',
    director: 'Alfred Hitchcock',  
    price: 5,
    category: 'Horror',
    img: './img/psicosis.jpg',
},
{
    id: 3,
    name: 'El Bebé de Rosemary (1968)', 
    director: 'Roman Polanski',
    price: 6,
    category: 'Horror',
    img: './img/elBebeDeRosemary.jpg',
},
{
    id: 4,
    name: 'Star Wars: episodio IV (1977)',
    director: 'George Lucas', 
    price: 5,
    category: 'Sci-Fi',
    img: './img/starWars.jpg',
},
{
    id: 5,
    name: 'Volver al Futuro (1985)',
    director: 'Robert Zemeckis', 
    price: 5,
    category: 'Sci-Fi',
    img: './img/volverAlFuturo.jpg',
},
{
    id: 6,
    name: 'Brazil (1985)',
    director: 'Terry Gilliam',
    price: 6,
    category: 'Sci-Fi',
    img: './img/brazil.jpg',
},
{
    id: 7,
    name: 'Batman (1989)',
    director: 'Tim Burton',
    price: 5,
    category: 'Action & Adventure',
    img: './img/batman.jpg',
},
{
    id: 8,
    name: 'RoboCop (1987)', 
    director: 'Paul Verhoeven',
    price: 4,
    category: 'Action & Adventure',
    img: './img/robocop.jpg',
},
{
    id: 9,
    name: 'Terminator (1984)', 
    director: 'James Cameron',
    price: 4,
    category: 'Action & Adventure',
    img: './img/terminator.jpg',
},
{
    id: 10,
    name: 'Annie Hall (1977)',
    director: 'Woody Allen',
    price: 5,
    category: 'Comedy',
    img: './img/annieHall.jpg',
},
{
    id: 11,
    name: 'El gran Lebowski (1998)',
    director: 'Joel y Ethan Coen',
    price: 4,
    category: 'Comedy',
    img: './img/lebowsky.jpg',
},
{
    id: 12,
    name: 'El Día de la Marmota (1993)',
    director: 'Groundhog Day',
    price: 5,
    category: 'Comedy',
    img: './img/elDiaDeLaMarmota.jpg',
},
{
    id: 13,
    name: 'Los Cazafantasmas (1984)',
    director: 'Ivan Reitman',
    price: 3,
    category: 'Family',
    img: './img/ghostbusters.jpg',
},
{
    id: 14,
    name: 'La Historia Sin Fin (1984)',
    director: 'Wolfgang Petersen',
    price: 6,
    category: 'Family',
    img: './img/laHistoriaSinFin.jpg',
},
{
    id: 15,
    name: 'Coneheads (1993)',
    director: 'Steve Barron',
    price: 3,
    category: 'Family',
    img: './img/coneheads.jpg',
},
{
    id: 16,
    name: 'La Naranja Mecánica (1971)',
    director: 'Stanley Kubrick',
    price: 10,
    category: 'Drama',
    img: './img/laNaranjaMecanica.jpg',
},
{
    id: 17,
    name: 'Apocalypse Now (1979)',
    director: 'Francis Ford Coppola',
    price: 8,
    category: 'Drama',
    img: './img/apocalypseNow.jpg',
},
{
    id: 18,
    name: 'Scarface (1983)',
    director: 'Brian De Palma',
    price: 8,
    category: 'Drama',
    img: './img/scarface.jpg',
},

];

// Para hacer la "páginación del ver más"

const splitProducts = size => {
    let dividedProducts = [];
    for (let i = 0; i < productsData.length; i += size)
      dividedProducts.push(productsData.slice(i, i + size)); // push al array el tramo desde el indice del loop hasta el valor size + el indicador
    return dividedProducts;
  };
  
  //Función para dividir los productos en arrays de 6 productos y manejar la páginación
  const productsController = {
    dividedProducts: splitProducts(6),
    nextProductsIndex: 1,
    productsLimit: splitProducts(6).length,
  };
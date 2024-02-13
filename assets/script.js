var apiKey = 'c988cdfbad395e988689bb2207e2282c';
var apiKeyUnsplash ='BiM4AdCKgc_fKmsMpIZlRA68qhUQGkoGHv9ZkF3T8Yw'


var inputSearch = document.querySelector('#inputSearch');
var btnSearch = document.querySelector('#btnSearch');

var nomeInput = document.querySelector('#nomeInput');
var temperatura = document.querySelector('#temperatura');
var imgFlag = document.querySelector('#imgFlag');
var condicao = document.querySelector('#condicao');
var condIcon = document.querySelector('#condIcon');
var umidade = document.querySelector('#umidade');
var vento = document.querySelector('#vento');

var conteudo = document.querySelector('#conteudo');
var textinho = document.querySelector('#textinho');

const pegarWeatherDados = async (city) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey + '&lang=pt_br';

    
    const result = await fetch(apiUrl);
    const dados = await result.json();
    console.log(dados);
    return dados;
}

const pegarImagem = async (city) => {
    const apiUrl = 'https://api.unsplash.com/photos/random?query=' + city + '&client_id=' + apiKeyUnsplash;
     
    const result = await fetch(apiUrl);
    const foto = await result.json();
    console.log(foto);
    return foto;
}

const mostrarWeatherDados = async (city) => {
    try {
        conteudo.classList.add('hide');
        textinho.classList.remove('hide');
        textinho.innerText = 'Carregando...'

        const [dados, foto] = await Promise.all([pegarWeatherDados(city), pegarImagem(city)]);

        document.body.style.backgroundImage = 'url(' + foto.urls.full + ')';
        imgFlag.src = 'https://flagsapi.com/' + dados.sys.country + '/flat/32.png';
        condIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + dados.weather[0].icon + '@2x.png');

        nomeInput.innerText = dados.name;
        temperatura.innerText = parseInt(dados.main.temp);
        condicao.innerText = dados.weather[0].description;
        vento.innerText = dados.wind.speed;
        umidade.innerText = dados.main.humidity;
    
        conteudo.classList.remove('hide');
        textinho.classList.add('hide');
    } catch (error) {
        conteudo.classList.add('hide');
        textinho.classList.remove('hide');
        textinho.innerText = 'Nenhum dado encontrado para a localização pedida.';
    }
}

btnSearch.addEventListener('click', (e) => {
    e.preventDefault();

    const city = inputSearch.value;
    mostrarWeatherDados(city);
});
 


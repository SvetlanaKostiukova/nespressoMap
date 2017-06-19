import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, transition, animate, style } from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations:[
    trigger('popUp', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("0.3s ease-out", style({ opacity: 1}))
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class AppComponent {
  @ViewChild('svg') svg:ElementRef;
  title = 'app works!';
  width:number = 650;
  showPopup:boolean = false;
  selectedBlend:number = 0;
  selectedCountry:number = -1;
  currShiftIdx:string = "0px";
  blendChanged:boolean = true;
  shownItems:number = 8;
  shiftIdx:number = 0;
  offset:number = 0;
  lines:any[] = [];
  countries:any[] = [
    {title:"Эфиопия", description:"750 год<br><br>По&nbsp;легенде, молодой пастух Кальди заметил, как веселы его козы, поевшие кофейных ягод. С&nbsp;тех пор отвар из&nbsp;кофейных ягод помогал не&nbsp;заснуть ему и&nbsp;местным монахам во&nbsp;время молитв.", classTitle:"ethiopia", coordX:378, coordY:115, popupX:135, popupY:245}, //coordX:165
    {title:"Бразилия", description:"Первые кофейные деревья были посажены в&nbsp;Бразилии в&nbsp;1727 году на&nbsp;территории нынешнего штата Пара. Бразильская легенда гласит, что кофе ввез на&nbsp;территорию страны полковник Франсиску ди&nbsp;Мелу-Пальета (Francisco de&nbsp;Melo Palheta) из&nbsp;французской колонии Гвиана, где должен был урегулировать пограничные споры. Кофейные деревья были подарком полковнику от&nbsp;его возлюбленной.", classTitle:"brasilia", coordX:186, coordY:191, popupX:120, popupY:247},
    {title:"Колумбия", description:"Первые плантации кофейных деревьев были посажены в&nbsp;начале XIX века вблизи столицы государства&nbsp;&mdash; Боготы. Объем собранного урожая был незначительным, и&nbsp;кофе не&nbsp;поступал в&nbsp;открытую продажу, а&nbsp;возможность попробовать его выпадала только в&nbsp;гостях у&nbsp;колумбийских вельмож. Поняв, что на&nbsp;своем любимом кофе можно неплохо заработать, они постепенно начали расширять площади плантаций. Вскоре кофе стали выращивать и&nbsp;в&nbsp;других регионах страны, а&nbsp;в&nbsp;1810 году он&nbsp;стал доступен для продажи.", classTitle:"columbia", coordX:122, coordY:144, popupX:100, popupY:235},
    {title:"Коста-Рика", description:"Производство кофе в&nbsp;Коста-Рике берет начало в&nbsp;1779&nbsp;году, в&nbsp;центральном регионе страны, в&nbsp;городе Месета, имеющем оптимальное сочетание климатических условий и&nbsp;характеристик почвы для кофейных плантаций. Семена &laquo;аравийского кофе&raquo; импортировали из&nbsp;Эфиопии в&nbsp;Европу, откуда они попали в&nbsp;Коста-Рику. Благодаря инициативе священника Феликса Веларде, в&nbsp;начале XIX века началось культивирование кофе, и&nbsp;вскоре правительство Коста-Рики решило поощрять производство кофе в&nbsp;стране, предлагая земельные участки тем, кто решил заняться кофейными плантациями. Таким образом, колониальный строй в&nbsp;Коста-Рике был преобразован в&nbsp;более организованное производство, и&nbsp;кофейные плантации стали стремительно расти, но&nbsp;появившиеся &laquo;кофейные бароны&raquo; обострили социальное неравенство в&nbsp;стране.", classTitle:"costa-rica", coordX:95, coordY:120, popupX:10, popupY:240},
    {title:"Гватемала", description:"Первые кофейные деревья в&nbsp;Гватемале появились в&nbsp;1750 году&nbsp;&mdash; саженцы завезли монахи-иезуиты. В&nbsp;то&nbsp;время фермерские хозяйства выращивали кофе только для личного потребления. И&nbsp;лишь в&nbsp;конце XIX века президент Хусто Руфино Барриос пригласил в&nbsp;Гватемалу европейцев, раздал им&nbsp;плантации для выращивания кофейных деревьев и&nbsp;тем самым дал толчок развитию кофейного производства в&nbsp;регионе.", classTitle:"gvatemala", coordX:78, coordY:107, popupX:20, popupY:240},
    {title:"Мексика", description:"Кофейные деревья в&nbsp;Мексике впервые появились в&nbsp;штате Веракрус в&nbsp;конце XVIII века благодаря испанцам, которые привезли с&nbsp;собой саженцы из&nbsp;Доминиканской Республики и&nbsp;Кубы. Производство кофе началось здесь спустя десятилетия, когда в&nbsp;Мексику переместились иммигранты из&nbsp;Гватемалы и&nbsp;других стран Центральной Америки. Долгое время кофе выращивался местными фермерами на&nbsp;небольших участках или в&nbsp;горах. И&nbsp;лишь после 1860-х годов, когда в&nbsp;Мексике сформировалось понятие собственности на&nbsp;землю, богатые европейцы смогли выкупить обширные районы для создания кофейных плантаций.", classTitle:"mexico", coordX:44, coordY:79, popupX:15, popupY:145},
    {title:"Индия", description:"Согласно легенде, кофе в&nbsp;Индии появился в&nbsp;самом начале XVII&nbsp;века, когда мусульманский пилигрим вывез контрабандой из&nbsp;Йемена семь кофейных зерен, посадив их&nbsp;затем на&nbsp;холмах Чандрагири. Уже через столетие британские предприниматели наладили на&nbsp;юге Индии производство кофе, создав плантации в&nbsp;штатах Кантараки, Кералы и&nbsp;Тамилнада.", classTitle:"india", coordX:467, coordY:92, popupX:33, popupY:225},
    {title:"Кения", description:"Кофе попал в&nbsp;Кению из&nbsp;Эфиопии в&nbsp;конце XIX&nbsp;века. Есть две версии появления кофе в&nbsp;этой стране. Согласно одной из&nbsp;них, саженцы завезли миссионеры Конгрегации Святого Духа. По&nbsp;второй, плантации в&nbsp;Кении появились благодаря британцам. Во&nbsp;всяком случае, именно британцы активно занимались развитием кофейной промышленности и&nbsp;культуры в&nbsp;стране до&nbsp;тех пор, пока Кения не&nbsp;получила независимость.", classTitle:"kenia", coordX:376, coordY:150, popupX:5, popupY:120},
    {title:"Индонезия", description:"История кофе в&nbsp;Индонезии началась с&nbsp;острова Ява, где голландские колонизаторы впервые стали выращивать кофе в&nbsp;XVII&nbsp;веке. Первые посадки арабики поначалу прижились, спрос на&nbsp;кофе стал расти по&nbsp;всему региону, но&nbsp;внезапно почти&nbsp;80% плантаций поразила кофейная ржавчина&nbsp;&mdash; и&nbsp;посадки пришлось восстанавливать почти что с&nbsp;нуля. На&nbsp;этот раз голландцы решили посадить робусту&nbsp;&mdash; и&nbsp;не&nbsp;прогадали: этот сорт оказался более устойчив к&nbsp;заболеваниям. И&nbsp;сегодня большая часть кофейных зёрен из&nbsp;Индонезии именно сорта робуста.", classTitle:"phillipin", coordX:550, coordY:145, popupX:5, popupY:120},
    {title:"latin", description:"", classTitle:"latin", coordX:139, coordY:167},
  ];
  blends: any[] = [
    {title:"Bukeela ka&nbsp;ethiopia", description:"Это изысканный кофе одной страны произрастания из&nbsp;100% арабики из&nbsp;Эфиопии: арабика Sidamo даёт аромат цветочных нот жасмина, а&nbsp;арабика Moka Boji&nbsp;&mdash; глубокий и&nbsp;пряный вкус, характерный для регионов, где кофе первоначально был дикорастущим.", img:"BUKEELAKAETHIOPIA-300", countries:["ethiopia"], coordX:60, coordY:335},
    {title:"Vivalto lungo", description:"Это сбалансированный бленд стопроцентной арабики из&nbsp;Южной Америки и&nbsp;Африки, отличающийся насыщенным вкусом с&nbsp;нотами обжарки и&nbsp;освежающими нотами жасмина, апельсинового дерева и&nbsp;бергамота.", img:"vivaltolungo-300", countries:["ethiopia", "brasilia", "columbia"], coordX:136, coordY:335},
    {title:"Envivo Lungo", description:"Самый интенсивный из&nbsp;всех блендов лунго, Envivo Lungo сочетает в&nbsp;себе отборную робусту из&nbsp;Мексики и&nbsp;обработанную особым способом арабику из&nbsp;Индии. В&nbsp;результате получается кофе с&nbsp;легким ароматом имбирного пряника, а&nbsp;также карамельными и&nbsp;древесными нотами.", img:"envivolungo-300", countries:["mexico", "india"], coordX:439, coordY:335},
    {title:"Roma", description:"Смесь арабики легкой обжарки из&nbsp;Южной и&nbsp;Центральной Америки (в&nbsp;основном&nbsp;&mdash; из&nbsp;Мексики), а&nbsp;также индийской робусты имеет насыщенный вкус. Такой вид обжарки придает бленду Roma сладкие и&nbsp;злаковые ноты, а&nbsp;также добавляет легкую ноту грецкого ореха.", img:"roma-300", countries:["mexico"], coordX:590, coordY:335},
    {title:"Arpeggio", description:"Представляет собой интенсивный бленд, состоящий из&nbsp;100% арабики. Длительная обжарка коста-риканской арабики придает бленду глубокие ноты какао и&nbsp;шоколада, которые прекрасно сочетаются с&nbsp;кремовой и&nbsp;шелковистой текстурой арабики из&nbsp;Бразилии.", img:"apreggio-300", countries:["brasilia", "costa-rica"], coordX:200, coordY:335},
    {title:"Dulsao do&nbsp;Brasil", description:"100% арабика из&nbsp;Бразилии, этот кофе&nbsp;&mdash; это сочетание раздельно обжаренного желтого и&nbsp;красного бурбона&nbsp;&mdash; разновидности арабики, выращенного на&nbsp;высокогорных плантациях Южной Бразилии. Нежный и&nbsp;сбалансированный вкус.", img:"dulsaodobradil-300", countries:["brasilia"], coordX:287, coordY:335},
    {title:"Capriccio", description:"Этот бленд отлично подходит под эспрессо&nbsp;&mdash; у&nbsp;него богатый аромат и&nbsp;злаковые ноты. Capriccio приобрел свой необычный вкус благодаря сочетанию южноамериканской арабики, бразильской арабики с&nbsp;небольшим количеством робусты (Индия). Легкая обжарка придает ему богатый вкус, сохраняя при этом легкую кислинку.", img:"capriccio-300", countries:["brasilia", "columbia", "india"], coordX:363, coordY:335},
    {title:"Volluto", description:"Бразилия и&nbsp;Колумбия. Этот бленд кофе одним из&nbsp;самых первых вошёл в&nbsp;коллекцию Nespresso. Он&nbsp;состоит из&nbsp;превосходной арабики из&nbsp;двух стран-лидеров по&nbsp;производству кофе (Бразилии и&nbsp;Колумбии), одновременно со&nbsp;сладкими нотами и&nbsp;легкой кислинкой, а&nbsp;также фруктовым ароматом.", img:"volluto-300", countries:["brasilia", "columbia"], coordX:439, coordY:335},
    {title:"Livanto", description:"Чистая арабика из&nbsp;Южной и&nbsp;Центральной Америки, Коста-Рики и&nbsp;Колумбии. Livanto&nbsp;&mdash; это прекрасно сбалансированный эспрессо с&nbsp;характерной карамельной нотой, легким фруктовым ароматом и&nbsp;нотами обжарки.", img:"livanto-300", countries:["costa-rica", "columbia", "gvatemala"], coordX:287, coordY:335},
    {title:"Kazaar", description:"Это насыщенный и&nbsp;крепкий бленд с&nbsp;густой кремовой текстурой, в&nbsp;составе которого два вида робусты из&nbsp;Гватемалы и&nbsp;Бразилии, а&nbsp;также бразильская арабика Черрадо. Для полного раскрытия потенциала каждого сорта кофе эксперты выбрали раздельный метод обжарки: сильная для робусты и&nbsp;длительная для арабики, что придаёт напитку сладкие ноты.", img:"kazaar-300", countries:["gvatemala", "brasilia"], coordX:363, coordY:335},
    {title:"Fortissio lungo", description:"Бленд из&nbsp;100% арабики: эксперты подобрали идеальные пропорции индийской арабики Мунсун Малабар и&nbsp;колумбийской арабики из&nbsp;региона Каука. Зёрна из&nbsp;Индии получают естественную обработку под действием муссонных ветров, что даёт напитку насыщенный и&nbsp;плотный вкус, богатый сладкими злаковыми нотами, в&nbsp;то&nbsp;время как колумбийская арабика оттеняет бленд лёгкой кислинкой.", img:"fortissiolungo-300", countries:["columbia", "india"], coordX:514, coordY:335},
    {title:"Rosabaya de&nbsp;Colombia", description:"Стопроцентная арабика трех разновидностей (Катурра, Типика и&nbsp;Кастильо), этот кофе раскрывается нежными фруктовыми нотами, имеет легкую кислинку и&nbsp;плотный насыщенный вкус.", img:"rosabayadecolombia-300", countries:["columbia"], coordX:590, coordY:335},
    {title:"Linizio lungo", description:"Стопроцентная арабика. Этот сбалансированный бленд сорта желтый бурбон из&nbsp;Бразилии, который обладает ярко выраженными солодовыми и&nbsp;злаковыми нотами, и&nbsp;арабики с&nbsp;Колумбийского высокогорья, которая делает вкус кофе бархатистым, а&nbsp;его текстуру более гладкой.", img:"liniziolungo-300", countries:["columbia","brasilia"], coordX:590, coordY:335},
    {title:"Indria from India", description:"Арабика и&nbsp;робуста, которые входят в&nbsp;состав бленда Indria, произрастают на&nbsp;юге Индии. Эти зерна обладают легкой горчинкой и&nbsp;плотным вкусом с&nbsp;пряными нотками гвоздики, перца и&nbsp;мускатного ореха.", img:"indryiafromindia-300", countries:["india"], coordX:514, coordY:335},
    {title:"Cosi", description:"В&nbsp;бленде Cosi сочетается арабика из&nbsp;Восточной Африки и&nbsp;из&nbsp;Центральной и&nbsp;Южной Америки, благодаря чему кофе обладает злаковыми, фруктовыми и&nbsp;цитрусовыми нотами. За&nbsp;фруктовые ноты как раз отвечает кенийская арабика&nbsp;&mdash; мягко обжаренные зерна высочайшего качества.", img:"cosi-300", countries:["kenia", "latin"], coordX:590, coordY:335},
    {title:"Dharkan", description:"У&nbsp;этого превосходного кофе из&nbsp;стопроцентной арабики из&nbsp;Латинской Америки и&nbsp;Азии изысканный аромат, ярко выраженный вкус с&nbsp;нотами злаков и&nbsp;горького какао, а&nbsp;также нежная бархатистая текстура и&nbsp;приятная горчинка в&nbsp;послевкусии.", img:"dharkan-300", countries:["phillipin", "costa-rica"], coordX:590, coordY:335}
  ];

  onClick(e: any){
    var countryClicked;
    var elemClicked = e.target;
    if(elemClicked instanceof SVGPolygonElement){
      countryClicked = elemClicked.getAttribute("id");
    } else if(elemClicked instanceof SVGPathElement){
      var classList = elemClicked.classList;
      countryClicked = classList[classList.length - 1];
    } else if(elemClicked instanceof SVGTextElement){
      var classList = elemClicked.classList;
      countryClicked = classList[0];
    }
    var selectedBlends = this.blends.filter((x) => x.countries.indexOf(countryClicked) == 0);
    var country = this.countries.find((x) => x.classTitle == countryClicked);
    console.log(selectedBlends)

    if(this.svg && selectedBlends.length){
      var svgDiv:HTMLElement = document.getElementById("lines");//this.svg.nativeElement;

      var groups = document.querySelectorAll("g.selected");
      for(var i = 0; i < groups.length; i++){
        groups[i].classList.remove("selected");
        groups[i].classList.remove("hidden");
      }

      this.lines.map((x) => x.style.opacity = '0');

      //remove lines from map
      for(var j = 0; j < this.lines.length; j++){
        svgDiv.removeChild(this.lines[j]);
      }
      this.lines = [];

      //load new lines
      
      this.selectedBlend = this.blends.indexOf(selectedBlends[0]);
      this.blendChanged = true;
      setTimeout(() =>{
        var firstIdx = this.selectedBlend - this.shiftIdx;
        console.log(firstIdx, this.shiftIdx, this.selectedBlend)
        // var last = selectedBlends[selectedBlends.length - 1];
        // var idx = this.blends.indexOf(last);
        // if(this.shiftIdx + (idx - this.selectedBlend) >= this.shownItems)

        
        for(var i = 0; i < selectedBlends.length; i++){
          var blend = selectedBlends[i];

          var idx = this.blends.indexOf(blend);
          var shiftLength = 100/this.shownItems;
          var blendShiftIdx = this.shiftIdx + (idx - this.selectedBlend);
          console.log(idx, blendShiftIdx, idx - this.selectedBlend)
          var offset = (this.width - 52)*(shiftLength/200 + blendShiftIdx*shiftLength/100) + 13;
          
          // var x = ratio == 1? (blend.coordX) * ratio: 
          var ratio = 650 / (this.width ? this.width: 650);
          var x = ratio == 1? offset * ratio : (offset + 28) * ratio;
          var y = ratio == 1? blend.coordY * ratio: 345;
          var line = this.drawLine(country.coordX, country.coordY, x, y);
          
          svgDiv.appendChild(line);
          this.lines.push(line);
        }
        //wait untill lines are added to svg container and show
        console.log(this.lines)
        setTimeout(() => {this.lines.map((x) => x.style.opacity = "1")}, 10);

        this.selectPopup(countryClicked);
        var group = document.querySelector("g." + countryClicked);
        if(group) {
          group.classList.add("selected");
        }
      }, 10);
    }
    // if(selectedBlend){
    //   this.onBlendSelected(selectedBlend);
    // }
  }

  selectPopup(countryClicked: string){
    var prevGroup = document.querySelector("g.hidden");
    if(prevGroup)
      prevGroup.classList.remove("hidden");
    var prevPolygon = document.querySelector("polygon.selected");
    var prevPath = document.querySelector("path.selected");
    if(prevPolygon)
      prevPolygon.classList.remove("selected");
    if(prevPath)
      prevPath.classList.remove("selected");
    var searchCountry = this.countries.find((x) => x.classTitle == countryClicked);
    this.selectedCountry = this.countries.indexOf(searchCountry);
    
    if(this.selectedCountry > -1){
      setTimeout(() => 
      this.showPopup = true
      , 500);
      var polygon = document.querySelector("polygon#" + countryClicked);
      if(!polygon)
        polygon = document.querySelector("path#" + countryClicked);
      if(polygon)
        polygon.classList.add("selected");
    }
  }

  onBlendSelected(blend: any, position:number = 0){
    if(this.selectedBlend == this.blends.indexOf(blend))
      this.blendChanged = false;
    else 
      this.blendChanged = true;
      console.log(this.blendChanged)
    this.selectedBlend = this.blends.indexOf(blend);

    //wait until content for popup is loaded
    setTimeout(()=>{
      if(this.svg && blend){
        var svgDiv:HTMLElement = document.getElementById("lines");//this.svg.nativeElement;

        //hide popup
        this.selectedCountry = -1;
        setTimeout(() => this.showPopup = false, 300);

        //hide all lines and pimps with country names
        var groups = document.querySelectorAll("g.selected");
        for(var i = 0; i < groups.length; i++){
          groups[i].classList.remove("selected");
          groups[i].classList.remove("hidden");
        }
        this.lines.map((x) => x.style.opacity = '0');

        //wait untill lines hiding animation is ended
        setTimeout(() => {
          //remove lines from map
          for(var j = 0; j < this.lines.length; j++){
            svgDiv.removeChild(this.lines[j]);
          }
          this.lines = [];

          //load new lines
          for(var i = 0; i < blend.countries.length; i++){
            var country = blend.countries[i];
            var countrySearch = this.countries.find((x) => x.classTitle == country);
            if(countrySearch){
              var ratio = 650 / (this.width ? this.width: 650);
              // console.log(ratio, this.width)
              // var x = ratio == 1? (blend.coordX) * ratio: 
              var x = ratio == 1? this.offset * ratio : (this.offset + 28) * ratio;
              var y = ratio == 1? blend.coordY * ratio: 345;
              var line = this.drawLine(x, y, countrySearch.coordX, countrySearch.coordY);
              svgDiv.appendChild(line);
              this.lines.push(line);
            }
          }
          //wait untill lines are added to svg container and show
          setTimeout(() => {this.lines.map((x) => x.style.opacity = "1")}, 10);

          //show popup and pimps with country names
          setTimeout(() => {
           // setTimeout(() => 
           this.selectPopup(blend.countries[0])//, 500);
            for(var i = 0; i < blend.countries.length; i++){
              var group = document.querySelector("g." + blend.countries[i]);
              if(group) {
                group.classList.add("selected");
              }
            }
          }, 300);
        }, this.lines.length ? 300: 0);
      }
    }, 300);
  }

  updateLines(){
    var blend = this.blends[this.selectedBlend];
    if(this.svg && blend){
      var svgDiv:HTMLElement = document.getElementById("lines");//this.svg.nativeElement;

      // var groups = document.querySelectorAll("g.selected");
      // for(var i = 0; i < groups.length; i++){
      //   groups[i].classList.remove("selected");
      //   groups[i].classList.remove("hidden");
      // }
      this.lines.map((x) => x.style.opacity = '0');

      //remove lines from map
      for(var j = 0; j < this.lines.length; j++){
        svgDiv.removeChild(this.lines[j]);
      }
      this.lines = [];

      //load new lines
      for(var i = 0; i < blend.countries.length; i++){
        var country = blend.countries[i];
        var countrySearch = this.countries.find((x) => x.classTitle == country);
        if(countrySearch){
          var ratio = 650 / (this.width ? this.width: 650);
          // var x = ratio == 1? (blend.coordX) * ratio: 
          var x = ratio == 1? this.offset * ratio : (this.offset + 28) * ratio;
          var y = ratio == 1? blend.coordY * ratio: 345;
          var line = this.drawLine(x, y, countrySearch.coordX, countrySearch.coordY);
          
          svgDiv.appendChild(line);
          this.lines.push(line);
        }
      }
      //wait untill lines are added to svg container and show
      setTimeout(() => {this.lines.map((x) => x.style.opacity = "1")}, 10);
      // setTimeout(() => {
      //   // this.selectPopup(blend.countries[0]);
      //   for(var i = 0; i < blend.countries.length; i++){
      //     var group = document.querySelector("g." + blend.countries[i]);
      //     if(group) {
      //       group.classList.add("selected");
      //     }
      //   }
      // }, 300);
    }
  }

  shiftChanged(shiftIdx: number){
    console.log("shift changed " + shiftIdx, this.blendChanged)
    this.shiftIdx = shiftIdx;
    var shiftLength = 100/this.shownItems;
    this.currShiftIdx = "calc(" + (shiftLength/2 + shiftLength*shiftIdx) + "% - 7px)";
    this.offset = (this.width - 52)*(shiftLength/200 + shiftIdx*shiftLength/100) + 13;
    if(!this.blendChanged)
      this.updateLines();
    else this.blendChanged = false;
  }

  drawLine(x1, y1, x2, y2){
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("style", "opacity:0;transition:opacity .3s;fill:none;stroke:#673766;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px;stroke-dasharray:0,11");
    return line;
  }

  onClosePopup(e: any){
    this.selectedCountry = -1;
    setTimeout(() => this.showPopup = false, 300);
    var group = document.querySelector("g.hidden");
    if(group)
      group.classList.remove("hidden");
    var prevPolygon = document.querySelector("polygon.selected");
    if(prevPolygon)
      prevPolygon.classList.remove("selected");
    var prevPath = document.querySelector("path.selected");
    if(prevPath)
      prevPath.classList.remove("selected");
  }

  ngAfterViewInit(){
    var app = document.getElementsByClassName("app").item(0);
    this.width = app.clientWidth;
    if(this.width < 650)
        this.shownItems = 4;
    var shiftLength = 100/this.shownItems;
    this.offset = (this.width - 52)*shiftLength/200 + 13;
    
    //this.onBlendSelected(this.blends[0]);//{blend: this.blends[0], x:60, y:387});

    window.addEventListener("resize", (e) =>{
      if(this.width != app.clientWidth) {
        this.width = app.clientWidth;
        if(this.width < 650)
          this.shownItems = 4;
        else
          this.shownItems = 8;
        
        var shiftLength = 100/this.shownItems;
        this.offset = (this.width - 52)*(shiftLength/200 + this.shiftIdx*shiftLength/100) + 13;
        this.updateLines();//.onBlendSelected(this.blends[this.selectedBlend]);
      }
    })
  }
}

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
  shiftIdx:number = 0;
  offset:number = 0;
  lines:any[] = [];
  countries:any[] = [
    {title:"Эфиопия", description:"750 год<br><br>По&nbsp;легенде, молодой пастух Кальди заметил, как веселы его козы, поевшие кофейных ягод. С&nbsp;тех пор отвар из&nbsp;кофейных ягод помогал не&nbsp;заснуть ему и&nbsp;местным монахам во&nbsp;время молитв.", classTitle:"ethiopia", coordX:490, coordY:171, popupX:95, popupY:115}, //coordX:165
    {title:"Бразилия", description:"Первые кофейные деревья были посажены в&nbsp;Бразилии в&nbsp;1727 году на&nbsp;территории нынешнего штата Пара. Бразильская легенда гласит, что кофе ввез на&nbsp;территорию страны полковник Франсиску ди&nbsp;Мелу-Пальета (Francisco de&nbsp;Melo Palheta) из&nbsp;французской колонии Гвиана, где должен был урегулировать пограничные споры. Кофейные деревья были подарком полковнику от&nbsp;его возлюбленной.", classTitle:"brasilia", coordX:241, coordY:221, popupX:120, popupY:297},
    {title:"Колумбия", description:"Первые плантации кофейных деревьев были посажены в&nbsp;начале XIX века вблизи столицы государства&nbsp;&mdash; Боготы. Объем собранного урожая был незначительным, и&nbsp;кофе не&nbsp;поступал в&nbsp;открытую продажу, а&nbsp;возможность попробовать его выпадала только в&nbsp;гостях у&nbsp;колумбийских вельмож. Поняв, что на&nbsp;своем любимом кофе можно неплохо заработать, они постепенно начали расширять площади плантаций. Вскоре кофе стали выращивать и&nbsp;в&nbsp;других регионах страны, а&nbsp;в&nbsp;1810 году он&nbsp;стал доступен для продажи.", classTitle:"columbia", coordX:188, coordY:184, popupX:70, popupY:230},
    {title:"Коста-Рика", description:"Производство кофе в&nbsp;Коста-Рике берет начало в&nbsp;1779&nbsp;году, в&nbsp;центральном регионе страны, в&nbsp;городе Месета, имеющем оптимальное сочетание климатических условий и&nbsp;характеристик почвы для кофейных плантаций. Семена &laquo;аравийского кофе&raquo; импортировали из&nbsp;Эфиопии в&nbsp;Европу, откуда они попали в&nbsp;Коста-Рику. Благодаря инициативе священника Феликса Веларде, в&nbsp;начале XIX века началось культивирование кофе, и&nbsp;вскоре правительство Коста-Рики решило поощрять производство кофе в&nbsp;стране, предлагая земельные участки тем, кто решил заняться кофейными плантациями. Таким образом, колониальный строй в&nbsp;Коста-Рике был преобразован в&nbsp;более организованное производство, и&nbsp;кофейные плантации стали стремительно расти, но&nbsp;появившиеся &laquo;кофейные бароны&raquo; обострили социальное неравенство в&nbsp;стране.", classTitle:"costa-rica", coordX:157, coordY:164, popupX:5.4, popupY:240},
    {title:"Гватемала", description:"Первые кофейные деревья в&nbsp;Гватемале появились в&nbsp;1750 году&nbsp;&mdash; саженцы завезли монахи-иезуиты. В&nbsp;то&nbsp;время фермерские хозяйства выращивали кофе только для личного потребления. И&nbsp;лишь в&nbsp;конце XIX века президент Хусто Руфино Барриос пригласил в&nbsp;Гватемалу европейцев, раздал им&nbsp;плантации для выращивания кофейных деревьев и&nbsp;тем самым дал толчок развитию кофейного производства в&nbsp;регионе.", classTitle:"gvatemala", coordX:141, coordY:150, popupX:49, popupY:200},
    {title:"Мексика", description:"Кофейные деревья в&nbsp;Мексике впервые появились в&nbsp;штате Веракрус в&nbsp;конце XVIII века благодаря испанцам, которые привезли с&nbsp;собой саженцы из&nbsp;Доминиканской Республики и&nbsp;Кубы. Производство кофе началось здесь спустя десятилетия, когда в&nbsp;Мексику переместились иммигранты из&nbsp;Гватемалы и&nbsp;других стран Центральной Америки. Долгое время кофе выращивался местными фермерами на&nbsp;небольших участках или в&nbsp;горах. И&nbsp;лишь после 1860-х годов, когда в&nbsp;Мексике сформировалось понятие собственности на&nbsp;землю, богатые европейцы смогли выкупить обширные районы для создания кофейных плантаций.", classTitle:"mexico", coordX:101, coordY:119, popupX:15, popupY:145},
    {title:"Индия", description:"Согласно легенде, кофе в&nbsp;Индии появился в&nbsp;самом начале XVII&nbsp;века, когда мусульманский пилигрим вывез контрабандой из&nbsp;Йемена семь кофейных зерен, посадив их&nbsp;затем на&nbsp;холмах Чандрагири. Уже через столетие британские предприниматели наладили на&nbsp;юге Индии производство кофе, создав плантации в&nbsp;штатах Кантараки, Кералы и&nbsp;Тамилнада.", classTitle:"india", coordX:578, coordY:122, popupX:33, popupY:225},
    {title:"Кения", description:"Кофе попал в&nbsp;Кению из&nbsp;Эфиопии в&nbsp;конце XIX&nbsp;века. Есть две версии появления кофе в&nbsp;этой стране. Согласно одной из&nbsp;них, саженцы завезли миссионеры Конгрегации Святого Духа. По&nbsp;второй, плантации в&nbsp;Кении появились благодаря британцам. Во&nbsp;всяком случае, именно британцы активно занимались развитием кофейной промышленности и&nbsp;культуры в&nbsp;стране до&nbsp;тех пор, пока Кения не&nbsp;получила независимость.", classTitle:"kenia", coordX:472, coordY:190, popupX:5, popupY:120},
    {title:"latin", description:"", classTitle:"latin", coordX:219, coordY:247},
  ];
  blends: any[] = [
    {title:"Bukeela ka&nbsp;ethiopia", description:"Это сочетание двух уникальных сортов арабики из&nbsp;Эфиопии: Sidamo (привносит в&nbsp;бленд яркие ноты жасмина&nbsp;&mdash; комплекс цветочных нот в&nbsp;аромате) и&nbsp;Moka Boji (глубокий и&nbsp;пряный вкус, характерный для этих регионов, где кофе первоначально был дикорастущим).", img:"Bukeelakaethiopia", countries:["ethiopia"], coordX:60, coordY:387},
    {title:"Arpeggio", description:"Представляет собой интенсивный бленд, состоящий из&nbsp;100% арабики. Длительная обжарка коста-риканской арабики придает бленду глубокие ноты какао и&nbsp;шоколада, которые прекрасно сочетаются с&nbsp;кремовой и&nbsp;шелковистой текстурой арабики из&nbsp;Бразилии.", img:"Arpeggio", countries:["brasilia", "costa-rica"], coordX:136, coordY:387},
    {title:"Fortissio lungo", description:"Бленд индийской арабики (Мунсун Малабар)&nbsp;&mdash; зёрна &laquo;альбинос&raquo; обрабатываются под действием муссонных ветров, создавая неповторимый ароматический профиль, насыщенный и&nbsp;плотный вкус, богатый сладкими злаковыми нотами,&nbsp;&mdash; и&nbsp;колумбийской арабики (регион Каука)&nbsp;&mdash; придает бленду нежную кислинку.", img:"Fortissiolungo", countries:["columbia", "india"], coordX:200, coordY:387},
    {title:"Livanto", description:"Ароматический профиль: это прекрасно сбалансированный эспрессо с&nbsp;характерной карамельной нотой и&nbsp;легким фруктовым ароматом. Сбалансированный вкус рождается из&nbsp;сочетания злаковых, солодовых и&nbsp;карамельных нот, а&nbsp;также утонченных фруктовых нот.", img:"Livanto", countries:["costa-rica", "columbia", "gvatemala"], coordX:287, coordY:387},
    {title:"Lungo Origin Guatemala", description:"В&nbsp;Гватемале выращиваются небольшие количества редких, исключительных сортов кофе. На&nbsp;склонах вулканических гор Сьерра-Мадре природой созданы почти идеальные условия для получения высококлассных зерен арабики. Бленд Lungo Origin Guatemala, созданный из&nbsp;арабики и&nbsp;мытой робусты, обладает мягким сбалансированным вкусом с&nbsp;сухими злаковыми и&nbsp;солодовыми нотами.", img:"LungoOriginGuatemala", countries:["gvatemala"], coordX:363, coordY:387},
    {title:"Envivo Lungo", description:"Самый интенсивный из&nbsp;всех блендов лунго, Envivo Lungo сочетает в&nbsp;себе отборную робусту из&nbsp;Мексики и&nbsp;обработанную особым способом арабику из&nbsp;Индии. В&nbsp;результате получается кофе с&nbsp;легким ароматом имбирного пряника, а&nbsp;также карамельными и&nbsp;древесными нотами.", img:"EnvivoLungo", countries:["mexico", "india"], coordX:439, coordY:387},
    {title:"Indria from India", description:"Арабика и&nbsp;робуста, которые входят в&nbsp;состав бленда Indria, произрастают на&nbsp;юге Индии. Эти зерна обладают легкой горчинкой и&nbsp;плотным вкусом с&nbsp;пряными нотками гвоздики, перца и&nbsp;мускатного ореха.", img:"IndriafromIndia", countries:["india"], coordX:514, coordY:387},
    {title:"Cosi", description:"В&nbsp;бленде Cosi сочетается арабика из&nbsp;Восточной Африки и&nbsp;из&nbsp;Центральной и&nbsp;Южной Америки, благодаря чему кофе обладает злаковыми, фруктовыми и&nbsp;цитрусовыми нотами. За&nbsp;фруктовые ноты как раз отвечает кенийская арабика&nbsp;&mdash; мягко обжаренные зерна высочайшего качества.", img:"Cosi", countries:["kenia", "latin"], coordX:590, coordY:387}
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
    var selectedBlend = this.blends.find((x) => x.countries.indexOf(countryClicked) == 0);

    if(selectedBlend){
      this.onBlendSelected(selectedBlend);
    }
  }

  selectPopup(countryClicked: string){
    var prevGroup = document.querySelector("g.hidden");
    if(prevGroup)
      prevGroup.classList.remove("hidden");
    var prevPolygon = document.querySelector("polygon.selected");
    if(prevPolygon)
      prevPolygon.classList.remove("selected");
    var searchCountry = this.countries.find((x) => x.classTitle == countryClicked);
    this.selectedCountry = this.countries.indexOf(searchCountry);
    
    if(this.selectedCountry > -1){
      // setTimeout(() => 
      this.showPopup = true;
      // , 300);
      var polygon = document.querySelector("polygon#" + countryClicked);
      polygon.classList.add("selected");
    }
  }

  onBlendSelected(blend: any, position:number = 0){
    this.selectedBlend = this.blends.indexOf(blend);

    //wait until content for popup is loaded
    setTimeout(()=>{
      if(this.svg && blend){
        var svgDiv:HTMLElement = this.svg.nativeElement;

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
              var x = ratio == 1? blend.coordX * ratio: (this.offset + 28) * ratio;
              var y = ratio == 1? blend.coordY * ratio: 463;
              var line = this.drawLine(x, y, countrySearch.coordX, countrySearch.coordY);
              svgDiv.appendChild(line);
              this.lines.push(line);
            }
          }
          //wait untill lines are added to svg container and show
          setTimeout(() => {this.lines.map((x) => x.style.opacity = "1")}, 10);

          //show popup and pimps with country names
          setTimeout(() => {
            setTimeout(() => this.selectPopup(blend.countries[0]), 500);
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
      var svgDiv:HTMLElement = this.svg.nativeElement;

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
      for(var i = 0; i < blend.countries.length; i++){
        var country = blend.countries[i];
        var countrySearch = this.countries.find((x) => x.classTitle == country);
        if(countrySearch){
          var ratio = 650 / (this.width ? this.width: 650);
          var x = ratio == 1? blend.coordX * ratio: (this.offset + 28) * ratio;
          var y = ratio == 1? blend.coordY * ratio: 463;
          var line = this.drawLine(x, y, countrySearch.coordX, countrySearch.coordY);
          svgDiv.appendChild(line);
          this.lines.push(line);
        }
      }
      //wait untill lines are added to svg container and show
      setTimeout(() => {this.lines.map((x) => x.style.opacity = "1")}, 10);
      setTimeout(() => {
        // this.selectPopup(blend.countries[0]);
        for(var i = 0; i < blend.countries.length; i++){
          var group = document.querySelector("g." + blend.countries[i]);
          if(group) {
            group.classList.add("selected");
          }
        }
      }, 300);
    }
  }

  shiftChanged(shiftIdx: number){
    this.shiftIdx = shiftIdx;
    this.currShiftIdx = "calc(" + (12.5 + 25*shiftIdx) + "% - 7px)";
    this.offset = (this.width - 52)*(0.125 + shiftIdx*0.25) + 13;
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
  }

  ngAfterViewInit(){
    var app = document.getElementsByClassName("app").item(0);
    this.width = app.clientWidth;
    this.offset = (this.width - 52)*0.125 + 13;
    
    this.onBlendSelected(this.blends[0]);//{blend: this.blends[0], x:60, y:387});

    window.addEventListener("resize", (e) =>{
      if(this.width != app.clientWidth) {
        this.width = app.clientWidth;
        this.offset = (this.width - 52)*(0.125 + this.shiftIdx*0.25) + 13;
        this.updateLines();//.onBlendSelected(this.blends[this.selectedBlend]);
      }
    })
  }
}

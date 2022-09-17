class Statement{

  static sourceAmount = {
    'ua': 0,
    'uo': 1,
    'ux': 2,
    'u-': 2,
    'i-': 1,
    'u+': 1,
    'i+': 5,
    'u*': 2,
    'i*': 1,
    'u>': 2,
    'i>': 2,
    //'u=': 2,
    //'i=': 2,
    'uA': 1,  //http://kgracin.com/logika/ndPravilaTeoremi.pdf kaze da su 2, ali jedan je zapravo nepotreban
    'iA': 1,
    'uE': 1,
    'iE': 3,
  }
  static methodFormat = {
    'ua': "",
    'uo': "",
    'ux': ",",
    'u-': "-",
    'i-': "",
    'u+': "",
    'i+': ",-,-",
    'u*': ",",
    'i*': "",
    'u>': "-",
    'i>': ",",
    //'u=': 2,
    //'i=': 2,
    'uA': "",
    'iA': "",
    'uE': "",
    'iE': ",-",
  }

  type = "Statement";
  
  constructor(expression, method, ...sources){
    this.expression = expression;
    
    this.method = method;
    this.sources = sources;
    this.valid = false;
    
  }
  
  printSelf(){
    console.log(`${this.expression} | ${this.sources} (${this.method})`);
  //this.expression, '  ', this.sources, '  ', this.method, 
  }
  
  
  
  stringOfSelf(){
    return str(this.expression.stringOfSelf()) + '                ' + str(this.sources) + ' ( ' + str(this.method) + ' ) ';
  }
  
  stringOfMetadata(){
    if(this.method == 'ua'){
      return `p.`;
    }
    
    //add appropreate symbols betweewn numbers, "" if the symbol is undefined (end of string from Statement.methodFormat)
    let formattedSources = this.sources.map((x, i) => `${x}${Statement.methodFormat[this.method][i] || ""}`);
    formattedSources = formattedSources.join("");


    return `${formattedSources} ${this.method[0]} ${Expression.expressionMap[this.method[1]]}`;
  }

  addSource(n){
    if(this.sources.length < Statement.sourceAmount[this.method]){
      this.sources.push(n);
    } else {
      this.sources = [n];
    }
  }

  
}
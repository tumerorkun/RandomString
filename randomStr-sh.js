try{
  const fs = require('fs');
  const chars = ["a","b","c","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
  var ids=0, sayac=0, final = [], fileName = 'RandomStrings'
      komb = { min:6, max:20, syCount:100000, bMax:5 };
      /*
       * 
       * RandomStrings 
       * Count = ( ((komb.max - komb.min) + 1)*komb.syCount )*komb.bMax
       *
       */
  
  fs.writeFileSync(fileName+'.txt','');

  function shuffle(a) {
    for (let p = a.length; p; p--) {
      let j = Math.floor(Math.random() * p);
      [a[p - 1], a[j]] = [a[j], a[p - 1]];
    }
  }
  
  function kombinasyon(numArr, choose, blg) {
    var n = numArr.length,
        c = [],
        basla = function ( start, choose_ ) {
          if ( choose_ == 0 ) {
            var arr = c.concat('');
            shuffle(arr);
            final.push(arr.join('')+'\r\n');
            sayac++;
          }
          else {
            for ( var i = start; i <= n - choose_; ++i ) {
              if ( sayac == komb.syCount ) { break; }
              c.push(numArr[i]);
              basla(i + 1, choose_ - 1);
              c.pop();
            }
          }
        }
    basla(blg, choose);
  }

  function yazdir() {
    shuffle(final);
    var son = new Array();
    for ( var b = 0,l = final.length-1; b <= l; b++ ){
      son[b] = (ids+b+1)+','+final[b];
    }
    fs.appendFileSync(fileName+'.txt',son.join(''));
  }

  for ( var a = 0; a < komb.bMax; a++ ) {
    for ( var i = komb.min; i <= komb.max; i++ ){
      kombinasyon(chars,i,a);sayac=0;
    }
    yazdir();ids = ids+final.length;final=[];
    console.log('Eklenen toplam random string sayisi: '+ids);
  }
  console.log('Bitti.');

}catch(err){console.log(err);}
/*
LOAD DATA INFILE 'random20li.txt'
INTO TABLE users20
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
txt dosyasini mysql veritabanina yuklemek icin
*/
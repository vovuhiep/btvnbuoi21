function DSCT() {
    this.arr = [];

    this.themCT = function(ct){
        this.arr.push(ct);
    }
    this.timViTri = function (tknv){
        var index = -1;
        for (var i = 0; i < this.arr.length; i++){
            var ct = this.arr[i];
            if(ct.tknv === tknv){
                index = i;
                break;
            }
        }
        return index;
    }

    this.xoaCT = function (tknv){
        var index = this.timViTri(tknv);
        if(index !== -1){
            this.arr.splice(index, 1);
        };
    };
    this.layThongTinCT = function(tknv){
        var index = this.timViTri(tknv);
        if (index !== -1){
            return this.arr[index];
        };
        return null;
    }
    
    this.capNhatCT = function(ct){
        var index = this.timViTri(ct.tknv);
        if (index !== -1){
          this.arr[index] = ct;
        }
      };
}

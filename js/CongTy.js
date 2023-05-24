function CongTy(
    _tknv,
    _name,
    _email,
    _password,
    _datepicker,
    _luongCB,
    _chucvu,
    _gioLam
){
    this.tknv = _tknv;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.datepicker = _datepicker;
    this.luongCB = _luongCB;
    this.chucvu = _chucvu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhTongLuong = function () {
        var _tongLuong = 0;
        if(_chucvu == "Sếp"){
            _tongLuong = _luongCB * 3;
        }else if(_chucvu == "Trưởng phòng") {
            _tongLuong = _luongCB * 2;
        }else if(_chucvu == "Nhân viên"){
            _tongLuong = _luongCB
        }   
        this.tongLuong = _tongLuong;
    }

    this.xepLoai = function () {
        var _xepLoai = ""
        if (_gioLam >= 192){
            _xepLoai = "Nhân viên xuất xắc";
        }else if(_gioLam >= 176){
            _xepLoai = "Nhân viên giỏi";
        }else if(_gioLam >= 160){
            _xepLoai = "Nhân viên khá";
        }else if(_gioLam < 160) {
            _xepLoai = "Nhân viên trung bình"
        }
        this.xepLoai = _xepLoai;
    }
}
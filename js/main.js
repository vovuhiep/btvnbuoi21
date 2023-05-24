var dsct = new DSCT();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
  }

function layThongTinCT(isAdd){
    var _tknv = getEle("tknv").value;
    var _name = getEle("name").value;
    var _email = getEle("email").value;
    var _password = getEle("password").value;
    var _datepicker = getEle("datepicker").value;
    var _luongCB = getEle("luongCB").value;
    var _chucvu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

  /**
   * Validation
   */
  var isValid = true;

  if (isAdd) {
    //Validation TKNV
    isValid &=
      validation.kiemTraRong(_tknv, "tbTKNV", "(*) Vui long nhap tai khoan") &&
      validation.kiemTraDoDaiKiTu(
        _tknv,
        "tbTKNV",
        "(*) Vui long nhap 4 - 10 ki tu",
        4,
        10
      ) &&
      validation.kiemTraTKNVTonTai(
        _tknv,
        "tbTKNV",
        "(*) Ma SV da ton tai!",
        dsct.arr
      );
  }

  //Validation Ten
  isValid &=
    validation.kiemTraRong(_name, "tbTen", "(*) Vui long nhap TenSV") &&
    validation.kiemTraChuoiKiTu(
      _name,
      "tbTen",
      "(*) Vui long nhap chuoi ki tu"
    );

  //Validation Email
  isValid &=
    validation.kiemTraRong(_email, "tbEmail", "(*) Vui long nhap Email") &&
    validation.kiemTraPattern(
      _email,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "tbEmail",
      "(*) Vui long nhap Email hop le!"
    );

  //Validation MatKhau
  isValid &=
    validation.kiemTraRong(
        _password,
      "tbMatKhau",
      "(*) Vui long nhap MatKhau"
    ) &&
    validation.kiemTraPattern(
        _password,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
      "tbMatKhau",
      "(*) Vui long nhap MatKhau hop le!"
    );


  if (!isValid) return null;




    var ct = new CongTy(
        _tknv,
        _name,
        _email,
        _password,
        _datepicker,
        _luongCB,
        _chucvu,
        _gioLam
    );
    ct.xepLoai();
    ct.tinhTongLuong();
    return ct;
}

function renderTable(data){
    var content = "";
    for (var i = 0; i < data.length; i++){
        var ct = data[i];
        content += `
            <tr>
                <td>${ct.tknv}</td>
                <td>${ct.name}</td>
                <td>${ct.email}</td>
                <td>${ct.datepicker}</td>
                <td>${ct.chucvu}</td>
                <td>${ct.tongLuong}</td>
                <td>${ct.xepLoai}</td>
                <td>
                    <button class=" btn btn-info" onclick="editCT('${ct.tknv}')">Edit</button>
                </td>
                <td>
                    <button class=" btn btn-danger" onclick="deleteCT('${ct.tknv}')">Delete</button>
                </td>
            </tr>
        `;   
    }
    getEle("tableDanhSach").innerHTML = content;
}

function deleteCT(tknv){
    dsct.xoaCT(tknv);
    renderTable(dsct.arr);
    setLocalStorage();
}

function editCT(tknv){
    var ct = dsct.layThongTinCT(tknv);
    if(ct){
        getEle("tknv").value = ct.tknv;
        getEle("tknv").disabled = true;
        getEle("name").value = ct.name;
        getEle("email").value = ct.email;
        getEle("password").value = ct.password;
        getEle("datepicker").value = ct.datepicker;
        getEle("luongCB").value = ct.luongCB;
        getEle("chucvu").value = ct.chucvu;
        getEle("gioLam").value = ct.gioLam;
    }
    getEle("btnThemNV").style.display = "none";
    getEle("btnCapNhat").style.display = "inline-block"
}

getEle("btnCapNhat").addEventListener("click", function (event){
    event.preventDefault();
    var ct = layThongTinCT(false);
    dsct.capNhatCT(ct);
    renderTable(dsct.arr);
    setLocalStorage();
})

getEle("btnThemNV").addEventListener("click", function (event) {
    event.preventDefault();
    var ct = layThongTinCT(true);
    if(ct){
        dsct.themCT(ct);
        renderTable(dsct.arr);
        setLocalStorage();
    }
})

function setLocalStorage(){
    var dataString = JSON.stringify(dsct.arr);
    localStorage.setItem("DSCT", dataString);
}

function getLocalStorage(){
    if(localStorage.getItem("DSCT")){
        var dataString = localStorage.getItem("DSCT");
        dsct.arr = JSON.parse(dataString);
        renderTable(dsct.arr);
    }
};
getLocalStorage();
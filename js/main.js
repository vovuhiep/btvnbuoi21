var dsct = new DSCT();

function getEle(id) {
    return document.getElementById(id);
  }

function layThongTinCT(){
    var _tknv = getEle("tknv").value;
    var _name = getEle("name").value;
    var _email = getEle("email").value;
    var _password = getEle("password").value;
    var _datepicker = getEle("datepicker").value;
    var _luongCB = getEle("luongCB").value;
    var _chucvu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;



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

    ct.tinhTongLuong();
    return ct;
}

function rederTable(data){
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
    rederTable(dsct.arr);
    setLocalStorage();
}

function editCT(tknv){
    var ct = dsct.suaCT(tknv);
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
    rederTable(dsct.arr);
    setLocalStorage();
})

getEle("btnThemNV").addEventListener("click", function (event) {
    event.preventDefault();
    var ct = layThongTinCT(true);
    if(ct == null) return;
    dsct.themCT(ct);
    rederTable(dsct.arr);
    setLocalStorage();
})

function setLocalStorage(){
    if(localStorage.getItem("DSCT")){
        var dataString = localStorage.getItem("DSCT");
        var dataJson = JSON.parse(dataString);
        dsct.arr = dataJson;
        renderTable(dsct.arr);
    }
};
getLocalStorage();
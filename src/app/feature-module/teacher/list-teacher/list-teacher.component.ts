import {Component, OnInit} from '@angular/core';
import {ITeacher} from "../../../entity/ITeacher";
import {IDivision} from "../../../entity/IDivision";
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {Router} from "@angular/router";
import {DivisionService} from "../../../core-module/teacher/division.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {CreateTeacherComponent} from "../create-teacher/create-teacher.component";
import {CreateAccountComponent} from "../../account/create-account/create-account.component";

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {

  teacher: ITeacher; // tạo đối tượng teacher
  teachers: ITeacher [] = []; //tạo danh sách teacher
  division: IDivision [] | any = []; //tạo danh sách phòng ban(tao select -option ch)
  totalElement: number = 0; //khởi tạo số phần tử của danh sách giáo viên
  pageObj: any = {page: 0, size: 10} //khởi tạo 1 trang bao gồm thuộc tính : trang hiện tại, số phần tử/trang
  name: string | any = ''; //tạo biến tìm kiếm theo tên
  divisionId: number | any = ''; //tạo biến tìm kiếm theo phòng ban
  responsePage: any; //tạo biến để nhận giá trị Observable
  totalPages: number = 0;
  oldName: string = "";
  oldDivisionId: number = -1;

  constructor(private teacherService: TeacherService,
              private router: Router,
              private divisionService: DivisionService,
              private dialog: MatDialog,
              private snackBar: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllDivision();
    this.getAllAndSearchByKeywordAndDivision(this.pageObj);
  }

  //gọi ra danh sách phòng ban theo api - LinhDN
  getAllDivision() {
    this.divisionService.findAll().subscribe(division => {
      this.division = division;
      console.log(this.division)
    })
  }

//

  //hien thi danh sach theo tu khoa tim kiem && phong ban - LinhDN
  getAllAndSearchByKeywordAndDivision(page: any) {
    if ((this.name || this.divisionId) != "") {  //fix lỗi: đứng ở trang 2,3..: không tìm được infor object trang 0/1 --> khi tìm kiếm --> cho về page = 0
      if(!(this.name == this.oldName && this.divisionId == this.oldDivisionId)){
        this.pageObj.page = 0;
        this.oldName = this.name;
        this.oldDivisionId = this.divisionId;
      }
    }
    let name = this.name.trim(); //bỏ ký tự trắng ở đầu khi nhập keyword tìm kiếm
    this.teacherService.findAllbyAllField(page, name, this.divisionId).subscribe(data => {
      this.responsePage = data;
      this.teachers = this.responsePage['content'];   //mảng chứa các phần tử (per page)
      this.totalElement = this.responsePage['totalElements']; //tổng số phần tử
      this.totalPages = this.responsePage['totalPages']
    }, error => {
      if (this.divisionId == 0) { //neu nguoi dung chon option"Chon phong ban - ~ value = 0 thi chi tim kiem theo ten
        this.teacherService.findAllbyName(page, name).subscribe(data => {
          this.responsePage = data;
          this.teachers = this.responsePage['content'];   //mảng chứa các phần tử (per page)
          this.totalElement = this.responsePage['totalElements']; //tổng số phần tử
        }, error => {
          this.snackBar.showSnackbar("Không tìm thấy dữ liệu giáo viên", 'error');
        })
      } else {
        this.snackBar.showSnackbar("Không tìm thấy dữ liệu giáo viên", 'error');
      }

    })

  }

  // mo ra dialog xoa giao vien - LinhDN
  openDeleteDialog(id: number, nameTeacher: String) {
    let dialog = this.dialog.open(DialogDeleteComponent, {
      data: {
        id: id,
        name: nameTeacher,
        object: "giáo viên"
      }
    });
    dialog.afterClosed().subscribe(nextClose => {
      if (nextClose == `yes`) {
        this.teacherService.delete(id, this.teacher).subscribe(data => {
          console.log(data);
          this.snackBar.showSnackbar("Xoá giáo viên " + name + " thành công", "success");
          this.ngOnInit();
        })
      }
    })
  }

  //trang trước đó - LinhDN
  previousPage() {
    this.pageObj['page']--;
    this.getAllAndSearchByKeywordAndDivision(this.pageObj);
  }

  //trang tiep theo - LinhDN
  nextPage() {
    this.pageObj['page']++;
    console.log(this.pageObj['page'])
    this.getAllAndSearchByKeywordAndDivision(this.pageObj);
  }

  //lấy số trang
  getPage(value: number) {
    console.log("page")
    console.log(this.responsePage.totalPages)
    console.log(value);
    if (value == null) {
      this.snackBar.showSnackbar("Vui lòng nhập số trang cần tìm", 'error');
    }
    if (Number(value) <= this.responsePage.totalPages && Number(value) > 0 && Number(value) % 1 == 0) {
      this.pageObj['page'] = Number(value) - 1
      console.log(this.pageObj['page'])
      this.getAllAndSearchByKeywordAndDivision(this.pageObj);
    } else {
      this.snackBar.showSnackbar("Trang cần tìm không hợp lệ", 'error');
    }
  }

  //lấy Id phòng ban người dùng chọn - LinhDN
  getDivision($event: any) {
    this.divisionId = $event.target.value;
    console.log(this.divisionId)
  }

  //lấy keyword tên người dùng nhập - LinhDN
  getName($event: any) {
    this.name = $event.target.value;
    console.log(this.name)
  }

  // router sang chức năng tạo mới - LinhDN
  movePageCreateTeacher() {
    this.router.navigateByUrl("/teacher/create");
  }


  openDialogCreate() {
    let dialogRef = this.dialog.open(CreateTeacherComponent,{
      width:'1100px',
      autoFocus:false,
      maxHeight:'100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }


  movePageDetailAccount() {
    this.router.navigateByUrl("/teacher/detail/create")
  }

  movePageCreateAccount(id: number, email: string) {
    let dialog = this.dialog.open(CreateAccountComponent, {
        maxWidth: '650px',
        data: {
          id: id,
          email: email
        }
      }
    );
    dialog.afterClosed().subscribe(()=> this.ngOnInit())
  }

}

import { Component } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { getStorage,ref,uploadBytes,getDownloadURL } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire/app';
import {Auth,getAuth} from '@angular/fire/auth'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //url; //Angular 8
	url: any; //Angular 11, for stricter type
	msg = "";
	auth :Auth;
	download_url :any;

	result_url :any;
	user :any;

  constructor(private http: HttpClient,private afApp : FirebaseApp ){
	this.auth = getAuth(afApp);
  }

  
	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		// var reader = new FileReader();
		// reader.readAsDataURL(event.target.files[0]);
		
		// reader.onload = (_event) => {
		// 	this.msg = "";
		// 	this.url = reader.result;
		// 	const storage = getStorage();
		// 	const storageRef = ref(storage, 'hi.jpg');
		// 	uploadBytes(storageRef, this.url).then((snapshot) => {
		// 		console.log('Uploaded a blob or file!');
		// 	  }); 
      
		// }

		const file = event.target.files[0];
		const storage = getStorage();
		const rand = Math.floor(Math.random()*(10**6)+1)
		this.user = 'user' + rand.toString()
		const storageRef = ref(storage, 'input_imgs/'+this.user);
		uploadBytes(storageRef, file).then((snapshot) => {
			console.log('Uploaded a blob or file!');
			getDownloadURL(storageRef).then((url)=>{
				this.download_url = url;
				console.log(this.download_url);
			})
		});
		
		 
      
		
	}

  getData(){
	this.result_url ="";

	return this.http.post<any>('http://localhost:3080/pyt',{'url':this.download_url,'user' :this.user}).subscribe(data=>{
		console.log(data);
		this.result_url = data.url;
	})



  }

  

  
  

  
}



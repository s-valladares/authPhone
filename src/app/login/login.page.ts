import { Component, OnInit } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  verificationId: string = "";
  code: number;
  telefono: number;
  constructor(
    private firebaseAuthentication: FirebaseAuthentication,
    public nvCtrl: NavController
    ) { 
    this.escuchador();
  }

  ngOnInit() {
  }

  escuchador() {
    this.firebaseAuthentication.onAuthStateChanged().subscribe((userInfo) => {
      if (userInfo) {
        alert('inicio sesion')
        this.nvCtrl.navigateRoot(['/home-page']);
      } else {
        alert('cerrar')
      }
    });
  }

  enviarMensaje() {
    this.firebaseAuthentication.verifyPhoneNumber("+502"+this.telefono, 30000).then(function (verificationId) {
      alert(verificationId);
      this.verificationId = verificationId;
    }, (error)=>{
      alert(error);
    });
  }

  verificar(){
    this.firebaseAuthentication.signInWithVerificationId("+502"+this.verificationId, this.code)
    .then(ok =>{
      alert('ok');
    })
    .catch(err => {
      alert(err)
    });
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {

itensCarrinho: IProdutoCarrinho [] = [];
total = 0;

constructor(public carrinhoService: CarrinhoService,
  private router: Router){}

ngOnInit(): void{
 this.itensCarrinho = this.carrinhoService.obtemCarrinho();
 this.calculaTotal();
}

calculaTotal(){
  this.total = this.itensCarrinho.reduce((prev, cur) => prev + (cur.preco * cur.quantidade),0);
}

removerProdutoCarrinho(produtoId: number){
  this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId)
  this.carrinhoService.removerProdutoCarrinho(produtoId)
  this.calculaTotal();
}

comprar(){
  alert("Parabéns, você finalizou a sua compra !")
  this.carrinhoService.limparCarrinho();
  this.router.navigate(["produtos"])
}

}
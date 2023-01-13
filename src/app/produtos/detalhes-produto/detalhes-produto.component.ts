import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IProduto, IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent {
produto: IProduto | undefined;
quantidade = 1;

constructor(private produtoService: ProdutosService,
  private route: ActivatedRoute,
  private notificaoService: NotificacaoService,
  private carrrinhoSerivce: CarrinhoService){}

ngOnInit(){
  const routeParams = this.route.snapshot.paramMap;
  const productId = Number(routeParams.get("id"));
  this.produto = this.produtoService.getOne(productId);
}

adicionarAoCarrinho(){
this.notificaoService.notificar("O Produto foi adicionado ao carrinho")
const produto: IProdutoCarrinho ={
  ...this.produto!,
  quantidade: this.quantidade
}
this.carrrinhoSerivce.adicionarAoCarrinho(produto);
}

}

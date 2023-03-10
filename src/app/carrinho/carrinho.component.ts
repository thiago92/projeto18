import { Component } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IProduto, IProdutoCarrinho } from '../produtos';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent {
  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;

  constructor(public carrinhoService: CarrinhoService, private router: Router) {

  }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => (prev + curr.preco * curr.quantidade), 0);
  }

  comprar() {
    alert("Paravens, você finalizou a sua compra!");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"]);
  }

  removerProdutoCarrinho(produtoId: number) {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calcularTotal();
    }

}

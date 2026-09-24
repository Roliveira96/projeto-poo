import './estilos/base.css';
import './estilos/menu.css';
import './estilos/demo.css';
import './estilos/visualizador.css';
import './estilos/abstract-factory.css';
import './estilos/decorator.css';
import './estilos/observer.css';
import { Aplicacao } from './app/Aplicacao';

const raiz: HTMLElement = document.getElementById('app') as HTMLElement;
new Aplicacao(raiz).iniciar();

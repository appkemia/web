import { AbilityBuilder, Ability } from '@casl/ability';

function subjectName(item) {
  if (!item || typeof item === 'string') {
    return item;
  }
  return item.__type;
}

export default function defineRulesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();
  // 'manage' and 'all' are special keywords in CASL.
  // manage represents any action and all represents any subject
  if (!user) {
    cannot('manage', 'all');
  } else if (user?.tipo === 'master') {
    can('manage', 'all');

    can('send_email', 'SendEmails');

    can('list', 'Empresas');
    can('select', 'Empresas');
    can('new', 'Empresas');
    can('edit', 'Empresas');
    can('show', 'Empresas');
    can('delete', 'Empresas');

    can('list', 'Configuracaos');
    can('edit', 'Configuracaos');
    can('show', 'Configuracaos');

    cannot('list', 'TarefasOperador');
    can('list', 'Tarefas');
    can('new', 'Tarefas');
    can('edit', 'Tarefas');
    can('show', 'Tarefas');

    can('list', 'Notificaoes');

    can('list', 'Usuarios');
    can('new', 'Usuarios');
    can('edit', 'Usuarios');
    can('show', 'Usuarios');
    can('delete', 'Usuarios');

    can('list', 'Locais');
    can('select', 'Locais');
    can('new', 'Locais');
    can('edit', 'Locais');
    can('show', 'Locais');
    can('delete', 'Locais');

    can('list', 'Tanques');
    can('new', 'Tanques');
    can('edit', 'Tanques');
    can('show', 'Tanques');
    can('delete', 'Tanques');

    can('list', 'Equipamentos');
    can('new', 'Equipamentos');
    can('edit', 'Equipamentos');
    can('show', 'Equipamentos');
    can('delete', 'Equipamentos');

    can('list', 'Etas');
    can('new', 'Etas');
    can('edit', 'Etas');
    can('show', 'Etas');
    can('delete', 'Etas');

    can('list', 'Lagoas');
    can('new', 'Lagoas');
    can('edit', 'Lagoas');
    can('show', 'Lagoas');
    can('delete', 'Lagoas');

    can('list', 'ControleOds');
    can('new', 'ControleOds');
    can('edit', 'ControleOds');
    can('show', 'ControleOds');
    can('delete', 'ControleOds');

    can('list', 'ControlePhs');
    can('new', 'ControlePhs');
    can('edit', 'ControlePhs');
    can('show', 'ControlePhs');
    can('delete', 'ControlePhs');

    can('list', 'ControleSses');
    can('new', 'ControleSses');
    can('edit', 'ControleSses');
    can('show', 'ControleSses');
    can('delete', 'ControleSses');

    can('list', 'TratamentoEfluenteLagoas');
    can('new', 'TratamentoEfluenteLagoas');
    can('edit', 'TratamentoEfluenteLagoas');
    can('show', 'TratamentoEfluenteLagoas');
    can('delete', 'TratamentoEfluenteLagoas');

    can('list', 'PolimentoEtas');
    can('new', 'PolimentoEtas');
    can('edit', 'PolimentoEtas');
    can('show', 'PolimentoEtas');
    can('delete', 'PolimentoEtas');

    can('list', 'ControleColetas');
    can('new', 'ControleColetas');
    can('edit', 'ControleColetas');
    can('show', 'ControleColetas');
    can('delete', 'ControleColetas');

    can('list', 'ControleVazaos');
    can('new', 'ControleVazaos');
    can('edit', 'ControleVazaos');
    can('show', 'ControleVazaos');
    can('delete', 'ControleVazaos');

    can('list', 'ControleTanques');
    can('new', 'ControleTanques');
    can('edit', 'ControleTanques');
    can('show', 'ControleTanques');
    can('delete', 'ControleTanques');

    can('list', 'ControleBombas');
    can('new', 'ControleBombas');
    can('edit', 'ControleBombas');
    can('show', 'ControleBombas');
    can('delete', 'ControleBombas');

    can('list', 'EquipamentoManutencaos');
    can('new', 'EquipamentoManutencaos');
    can('edit', 'EquipamentoManutencaos');
    can('show', 'EquipamentoManutencaos');
    can('delete', 'EquipamentoManutencaos');

    can('list', 'ControleConcentracaoCloros');
    can('new', 'ControleConcentracaoCloros');
    can('edit', 'ControleConcentracaoCloros');
    can('show', 'ControleConcentracaoCloros');
    can('delete', 'ControleConcentracaoCloros');

    can('list', 'ControlePastilhaCloros');
    can('new', 'ControlePastilhaCloros');
    can('edit', 'ControlePastilhaCloros');
    can('show', 'ControlePastilhaCloros');
    can('delete', 'ControlePastilhaCloros');
  } else if (user?.tipo === 'admin') {
    can('send_email', 'SendEmails');

    cannot('list', 'Empresas');
    cannot('select', 'Empresas');
    cannot('new', 'Empresas');
    cannot('edit', 'Empresas');
    cannot('show', 'Empresas');
    cannot('delete', 'Empresas');

    can('list', 'Configuracaos');
    can('edit', 'Configuracaos');
    can('show', 'Configuracaos');

    cannot('list', 'TarefasOperador');
    can('list', 'Tarefas');
    can('new', 'Tarefas');
    can('edit', 'Tarefas');
    can('show', 'Tarefas');

    can('list', 'Notificaoes');

    can('list', 'Usuarios');
    can('new', 'Usuarios');
    can('edit', 'Usuarios');
    can('show', 'Usuarios');
    can('delete', 'Usuarios');

    can('list', 'Locais');
    can('select', 'Locais');
    can('new', 'Locais');
    can('edit', 'Locais');
    can('show', 'Locais');
    can('delete', 'Locais');

    can('list', 'Tanques');
    can('new', 'Tanques');
    can('edit', 'Tanques');
    can('show', 'Tanques');
    can('delete', 'Tanques');

    can('list', 'Equipamentos');
    can('new', 'Equipamentos');
    can('edit', 'Equipamentos');
    can('show', 'Equipamentos');
    can('delete', 'Equipamentos');

    can('list', 'Etas');
    can('new', 'Etas');
    can('edit', 'Etas');
    can('show', 'Etas');
    can('delete', 'Etas');

    can('list', 'Lagoas');
    can('new', 'Lagoas');
    can('edit', 'Lagoas');
    can('show', 'Lagoas');
    can('delete', 'Lagoas');

    can('list', 'ControleOds');
    can('new', 'ControleOds');
    can('edit', 'ControleOds');
    can('show', 'ControleOds');
    can('delete', 'ControleOds');

    can('list', 'ControlePhs');
    can('new', 'ControlePhs');
    can('edit', 'ControlePhs');
    can('show', 'ControlePhs');
    can('delete', 'ControlePhs');

    can('list', 'ControleSses');
    can('new', 'ControleSses');
    can('edit', 'ControleSses');
    can('show', 'ControleSses');
    can('delete', 'ControleSses');

    can('list', 'TratamentoEfluenteLagoas');
    can('new', 'TratamentoEfluenteLagoas');
    can('edit', 'TratamentoEfluenteLagoas');
    can('show', 'TratamentoEfluenteLagoas');
    can('delete', 'TratamentoEfluenteLagoas');

    can('list', 'PolimentoEtas');
    can('new', 'PolimentoEtas');
    can('edit', 'PolimentoEtas');
    can('show', 'PolimentoEtas');
    can('delete', 'PolimentoEtas');

    can('list', 'ControleColetas');
    can('new', 'ControleColetas');
    can('edit', 'ControleColetas');
    can('show', 'ControleColetas');
    can('delete', 'ControleColetas');

    can('list', 'ControleVazaos');
    can('new', 'ControleVazaos');
    can('edit', 'ControleVazaos');
    can('show', 'ControleVazaos');
    can('delete', 'ControleVazaos');

    can('list', 'ControleTanques');
    can('new', 'ControleTanques');
    can('edit', 'ControleTanques');
    can('show', 'ControleTanques');
    can('delete', 'ControleTanques');

    can('list', 'ControleBombas');
    can('new', 'ControleBombas');
    can('edit', 'ControleBombas');
    can('show', 'ControleBombas');
    can('delete', 'ControleBombas');

    can('list', 'EquipamentoManutencaos');
    can('new', 'EquipamentoManutencaos');
    can('edit', 'EquipamentoManutencaos');
    can('show', 'EquipamentoManutencaos');
    can('delete', 'EquipamentoManutencaos');

    can('list', 'ControleConcentracaoCloros');
    can('new', 'ControleConcentracaoCloros');
    can('edit', 'ControleConcentracaoCloros');
    can('show', 'ControleConcentracaoCloros');
    can('delete', 'ControleConcentracaoCloros');

    can('list', 'ControlePastilhaCloros');
    can('new', 'ControlePastilhaCloros');
    can('edit', 'ControlePastilhaCloros');
    can('show', 'ControlePastilhaCloros');
    can('delete', 'ControlePastilhaCloros');
  } else if (user?.tipo === 'operator') {

    cannot('send_email', 'SendEmails');

    cannot('list', 'Empresas');
    cannot('select', 'Empresas');
    cannot('new', 'Empresas');
    cannot('edit', 'Empresas');
    cannot('show', 'Empresas');
    cannot('delete', 'Empresas');

    cannot('list', 'Configuracaos');
    cannot('edit', 'Configuracaos');
    cannot('show', 'Configuracaos');

    can('list', 'TarefasOperador');
    cannot('list', 'Tarefas');
    cannot('new', 'Tarefas');
    cannot('edit', 'Tarefas');
    cannot('show', 'Tarefas');

    cannot('list', 'Notificaoes');

    cannot('list', 'Usuarios');
    cannot('new', 'Usuarios');
    cannot('edit', 'Usuarios');
    cannot('show', 'Usuarios');
    cannot('delete', 'Usuarios');

    can('list', 'Locais');
    can('select', 'Locais');
    cannot('new', 'Locais');
    cannot('edit', 'Locais');
    cannot('show', 'Locais');
    cannot('delete', 'Locais');

    can('list', 'Tanques');
    can('new', 'Tanques');
    can('edit', 'Tanques');
    can('show', 'Tanques');
    can('delete', 'Tanques');

    can('list', 'Equipamentos');
    can('new', 'Equipamentos');
    can('edit', 'Equipamentos');
    can('show', 'Equipamentos');
    can('delete', 'Equipamentos');

    can('list', 'Etas');
    can('new', 'Etas');
    can('edit', 'Etas');
    can('show', 'Etas');
    can('delete', 'Etas');

    can('list', 'Lagoas');
    can('new', 'Lagoas');
    can('edit', 'Lagoas');
    can('show', 'Lagoas');
    can('delete', 'Lagoas');

    can('list', 'ControleOds');
    can('new', 'ControleOds');
    can('edit', 'ControleOds');
    can('show', 'ControleOds');
    can('delete', 'ControleOds');

    can('list', 'ControlePhs');
    can('new', 'ControlePhs');
    can('edit', 'ControlePhs');
    can('show', 'ControlePhs');
    can('delete', 'ControlePhs');

    can('list', 'ControleSses');
    can('new', 'ControleSses');
    can('edit', 'ControleSses');
    can('show', 'ControleSses');
    can('delete', 'ControleSses');

    can('list', 'TratamentoEfluenteLagoas');
    can('new', 'TratamentoEfluenteLagoas');
    can('edit', 'TratamentoEfluenteLagoas');
    can('show', 'TratamentoEfluenteLagoas');
    can('delete', 'TratamentoEfluenteLagoas');

    can('list', 'PolimentoEtas');
    can('new', 'PolimentoEtas');
    can('edit', 'PolimentoEtas');
    can('show', 'PolimentoEtas');
    can('delete', 'PolimentoEtas');

    can('list', 'ControleColetas');
    can('new', 'ControleColetas');
    can('edit', 'ControleColetas');
    can('show', 'ControleColetas');
    can('delete', 'ControleColetas');

    can('list', 'ControleVazaos');
    can('new', 'ControleVazaos');
    can('edit', 'ControleVazaos');
    can('show', 'ControleVazaos');
    can('delete', 'ControleVazaos');

    can('list', 'ControleTanques');
    can('new', 'ControleTanques');
    can('edit', 'ControleTanques');
    can('show', 'ControleTanques');
    can('delete', 'ControleTanques');

    can('list', 'ControleBombas');
    can('new', 'ControleBombas');
    can('edit', 'ControleBombas');
    can('show', 'ControleBombas');
    can('delete', 'ControleBombas');

    can('list', 'EquipamentoManutencaos');
    can('new', 'EquipamentoManutencaos');
    can('edit', 'EquipamentoManutencaos');
    can('show', 'EquipamentoManutencaos');
    can('delete', 'EquipamentoManutencaos');

    can('list', 'ControleConcentracaoCloros');
    can('new', 'ControleConcentracaoCloros');
    can('edit', 'ControleConcentracaoCloros');
    can('show', 'ControleConcentracaoCloros');
    can('delete', 'ControleConcentracaoCloros');

    can('list', 'ControlePastilhaCloros');
    can('new', 'ControlePastilhaCloros');
    can('edit', 'ControlePastilhaCloros');
    can('show', 'ControlePastilhaCloros');
    can('delete', 'ControlePastilhaCloros');
  }
  return rules;
}

export function buildAbilityFor(user) {
  return new Ability(defineRulesFor(user), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    subjectName,
  });
  // const ability = new Ability([], { subjectName });
  // ability.update(defineRulesFor(user));
  // return ability;
}

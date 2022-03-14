import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { AnexoI, AnexoII, AnexoIII, AnexoIV, AnexoV } from './mock/anexos';
import { Tabela } from './components/Tabela';
 
export function App() {
  const [Rbt12, setRbt12] = useState('');
  const [Rbap, setRbap] = useState('');
  const [select, setSelect] = useState('');
  const [anexo, setAnexo] = useState([]);
  const [inicio, setInicio] = useState(true);
  const [anexoProvedor, setAnexoProvedor] = useState([]);

  const [provedor, setProvedor] = useState(false);

  const [faixa, setFaixa] = useState('');
  const [faixaProvedor, setFaixaProvedor] = useState('');
  const [aliquotaNominal, setAliquotaNominal] = useState('');
  const [aliquotaNominalProvedor, setAliquotaNominalProvedor] = useState('');
  const [aliquotaEfetiva, setAliquotaEfetiva] = useState('');
  const [aliquotaEfetivaProvedor, setAliquotaEfetivaProvedor] = useState('');
  const [deducao, setDeducao] = useState('');
  const [deducaoProvedor, setDeducaoProvedor] = useState('');
  const [das, setDas] = useState('');
  const [dasProvedor, setDasProvedor] = useState('');
  
  const [percentualIcms, setPercentualIcms] = useState('');
  const [tiraIss, setTiraIss] = useState('');
  const [aliquotaProvedor, setAliquotaProvedor] = useState('');
  const [valorImposto, setValorImposto] = useState('');

  const [receitasAcumuladas, setReceitasAcumuladas] = useState('');
  const [numMesesCorridos, setNumeroMesesCorridos] = useState('');
  const [massaSalarial, setMassaSalarial] = useState('');
  const [fatorR, setFatorR] = useState(true);

  const handleChangefat = ({ target: { value } }) => setRbt12(value);
  const handleChangeRbap = ({ target: { value } }) => setRbap(value);
  const handleSelect = ({ target: { value } }) => {
    setSelect(value);
    handleChangeSelect(value);
    if (value !== 'anexoV') {
      setFatorR(true);
    } else {
      setFatorR(false);
    }
  };

  const handleSubmitTotalizar = () => {
    const receitas = Number.parseFloat(receitasAcumuladas);
    const meses = Number.parseInt(numMesesCorridos);
    const calculo = Math.round((receitas / meses) * 12 * 100) / 100;
    setRbt12(calculo);
  };

  const onChangeChek = ({ target }) => {
    target.checked ? setInicio(false) : setInicio(true);
  };
  
  const onChangeChekProvedor = ({ target }) => {
    target.checked ? setProvedor(true) : setProvedor(false);
    //console.log(provedor);
    setAnexoProvedor(AnexoIII);
    
  };

  const handleChangeReceitasAcumuladas = ({ target: { value } }) =>{
    setReceitasAcumuladas(value);
  };

  function handleChangeMesesFaturamento({ target: { value } }) {
    setNumeroMesesCorridos(value);
  }

  const handleChangeSelect = (value) => {
    let result = [];
    if (value === '') {
      result = [];
    } else if (value === 'anexoI') {
      result = AnexoI;
    } else if (value === 'anexoII') {
      result = AnexoII;
    } else if (value === 'anexoIII') {
      result = AnexoIII;
    } else if (value === 'anexoIV') {
      result = AnexoIV;
    } else if (value === 'anexoV') {
      result = AnexoV;
    }

    setAnexo(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const Rbt12Conv = Number.parseFloat(Rbt12);
    setMassaSalarial((Math.round(Rbt12Conv * 0.28) * 100) / 100);
    anexo.map((faixa) => {
      if (
        Rbt12Conv >= faixa.receitaBrutaInicial &&
        Rbt12Conv <= faixa.receitaBrutaFinal
      ) {
        setFaixa(faixa.faixa);
        console.log(faixa.faixa);
        // faixa.faixa === 5 && setFatorR(false);
        setAliquotaNominal(faixa.aliquota);
        const aliquotaEfetivaCalculo =
          (((Rbt12Conv * Number.parseFloat(faixa.aliquota)) / 100 -
            Number.parseFloat(faixa.deducao)) /
            Rbt12Conv) *
          100;
        setAliquotaEfetiva(
          faixa.faixa > 1
            ? Math.round(aliquotaEfetivaCalculo * 100) / 100
            : faixa.aliquota,
        );
        setDeducao(faixa.deducao);
        const a1 =
          Math.round(
            (aliquotaEfetivaCalculo / 100) * Number.parseFloat(Rbap) * 100,
          ) / 100;
        const a2 =
          Math.round(
            (Number.parseFloat(faixa.aliquota) / 100) *
              Number.parseFloat(Rbap) *
              100,
          ) / 100;
        setDas(faixa.faixa > 1 ? a1 : a2);

        let percentIcms = Number.parseFloat(aliquotaEfetiva) * (faixa.icms / 100);
        setPercentualIcms(percentIcms);
        console.log('Percentual:' + percentualIcms);
      }

      if(provedor === true)
      {
        anexoProvedor.map((faixa) => {  
          if (Rbt12Conv >= faixa.receitaBrutaInicial && Rbt12Conv <= faixa.receitaBrutaFinal) {
            setFaixaProvedor(faixa.faixa);
            //console.log(faixa.faixa);
            // faixa.faixa === 5 && setFatorR(false);
            setAliquotaNominalProvedor(faixa.aliquota);
            const aliquotaEfetivaCalculoProvedor = (((Rbt12Conv * Number.parseFloat(faixa.aliquota)) / 100 -  Number.parseFloat(faixa.deducao)) / Rbt12Conv) * 100;
            setAliquotaEfetivaProvedor(faixa.faixa > 1 ? Math.round(aliquotaEfetivaCalculoProvedor * 100) / 100 : faixa.aliquota,);
            setDeducaoProvedor(faixa.deducao);
            const a1Provedor = Math.round((aliquotaEfetivaCalculoProvedor / 100) * Number.parseFloat(Rbap) * 100,) / 100;
            const a2Provedor = Math.round((Number.parseFloat(faixa.aliquota) / 100) * Number.parseFloat(Rbap) * 100,) / 100;
            setDasProvedor(faixa.faixa > 1 ? a1Provedor : a2Provedor);
            
            const calcTiraIss = aliquotaEfetivaCalculoProvedor * (1 - (faixa.iss / 100));
            setTiraIss(calcTiraIss);
            console.log('Tira Iss:' + tiraIss);
    
            const CalcAliquotaProvedor = percentualIcms + tiraIss;
            setAliquotaProvedor(CalcAliquotaProvedor);
            console.log('Aliquota Provedor:' + aliquotaProvedor);
    
            const imposto = (Number.parseFloat(Rbap) / 100) * aliquotaProvedor;
            setValorImposto(imposto);
            console.log('Imposto: ' + imposto);
    
          }
          return true;
        });

      }

      return true;
    });
  };

  const handleSubmitProvedor = (event) => {
    event.preventDefault();
    const Rbt12Conv = Number.parseFloat(Rbt12);
    setMassaSalarial((Math.round(Rbt12Conv * 0.28) * 100) / 100);

    anexo.map((faixa) => {
      if (Rbt12Conv >= faixa.receitaBrutaInicial && Rbt12Conv <= faixa.receitaBrutaFinal) {
        setFaixa(faixa.faixa);
        //console.log(faixa.faixa);
        // faixa.faixa === 5 && setFatorR(false);
        setAliquotaNominal(faixa.aliquota);
        const aliquotaEfetivaCalculo = (((Rbt12Conv * Number.parseFloat(faixa.aliquota)) / 100 - Number.parseFloat(faixa.deducao)) /  Rbt12Conv) * 100;
        setAliquotaEfetiva(faixa.faixa > 1 ? Math.round(aliquotaEfetivaCalculo * 100) / 100 : faixa.aliquota,);
        setDeducao(faixa.deducao);
        const a1 = Math.round((aliquotaEfetivaCalculo / 100) * Number.parseFloat(Rbap) * 100,) / 100;
        const a2 = Math.round((Number.parseFloat(faixa.aliquota) / 100) * Number.parseFloat(Rbap) * 100,) / 100;
        setDas(faixa.faixa > 1 ? a1 : a2);

        let percentIcms = Number.parseFloat(aliquotaEfetiva) * (faixa.icms / 100);
        setPercentualIcms(percentIcms);
        console.log('Percentual:' + percentualIcms);
        
      }
      return true
    });

    anexoProvedor.map((faixa) => {  
      if (Rbt12Conv >= faixa.receitaBrutaInicial && Rbt12Conv <= faixa.receitaBrutaFinal) {
        setFaixaProvedor(faixa.faixa);
        //console.log(faixa.faixa);
        // faixa.faixa === 5 && setFatorR(false);
        setAliquotaNominalProvedor(faixa.aliquota);
        const aliquotaEfetivaCalculoProvedor = (((Rbt12Conv * Number.parseFloat(faixa.aliquota)) / 100 -  Number.parseFloat(faixa.deducao)) / Rbt12Conv) * 100;
        setAliquotaEfetivaProvedor(faixa.faixa > 1 ? Math.round(aliquotaEfetivaCalculoProvedor * 100) / 100 : faixa.aliquota,);
        setDeducaoProvedor(faixa.deducao);
        const a1Provedor = Math.round((aliquotaEfetivaCalculoProvedor / 100) * Number.parseFloat(Rbap) * 100,) / 100;
        const a2Provedor = Math.round((Number.parseFloat(faixa.aliquota) / 100) * Number.parseFloat(Rbap) * 100,) / 100;
        setDasProvedor(faixa.faixa > 1 ? a1Provedor : a2Provedor);
        
        const calcTiraIss = aliquotaEfetivaCalculoProvedor * (1 - (faixa.iss / 100));
        setTiraIss(calcTiraIss);
        console.log('Tira Iss:' + tiraIss);

        const CalcAliquotaProvedor = percentualIcms + tiraIss;
        setAliquotaProvedor(CalcAliquotaProvedor);
        console.log('Aliquota Provedor:' + aliquotaProvedor);

        const imposto = (Number.parseFloat(Rbap) / 100) * aliquotaProvedor;
        setValorImposto(imposto);
        console.log('Imposto: ' + imposto);

      }
      return true;
    });
  };
  if(provedor === true){
    return (
      <>
        <Form style={{ margin: '60px' }}>

          {/* Anexo */}
          <FormGroup>
            <Label for="tableSelect">Anexo:</Label>
            <Input
              id="tableSelect"
              name="tableSelect"
              type="select"
              style={{ width: '385px' }}
              value={select}
              onChange={handleSelect}
            >
              <option value="" selected>
                --Selecione--
              </option>
              <option value="anexoI">Anexo I</option>
              <option value="anexoII">Anexo II</option>
              <option value="anexoIII">Anexo III</option>
              <option value="anexoIV">Anexo IV</option>
              <option value="anexoV">Anexo V</option>
            </Input>
          </FormGroup>

          {/* Fat 12 meses */}
          <FormGroup check style={{ marginTop: '35px', marginBottom: '35px' }}>
            <Input type="checkbox" onChange={onChangeChek} value={inicio} />{' '}
            <Label check>Faturamento Acima de 12 meses</Label>
          </FormGroup>
          
          {/* Provedor */}
          <FormGroup check style={{ marginTop: '35px', marginBottom: '35px' }}>
            <Input type="checkbox" onChange={onChangeChekProvedor} value={inicio} />{' '}
            <Label check>Provedor</Label>
          </FormGroup>

          {/* Receitas */}
          <FormGroup>
            <Label for="receitasAcumuladas">Receitas Acumuladas</Label>
            <Input
              disabled={!inicio}
              required
              placeholder="R$ 0,00"
              style={{ width: '190px' }}
              value={receitasAcumuladas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
              name="receitasAcumuladas"
              onChange={handleChangeReceitasAcumuladas}
            />
          </FormGroup>

          {/* meses */}
          <FormGroup>
            <Label for="mesesfaturamento">Meses de Faturamento</Label>
            <Input
              disabled={!inicio}
              required
              placeholder="0"
              style={{ width: '190px' }}
              value={numMesesCorridos}
              name="receitasAcumuladas"
              onChange={handleChangeMesesFaturamento}
            />
            <Button
              style={{ marginTop: '8px' }}
              type="button"
              onClick={handleSubmitTotalizar}
            >
              Totalizar
            </Button>
          </FormGroup>

          <section style={{ display: 'flex'}}>

            {/* rbt12 */}
            <FormGroup>
              <Label for="Rbt12">Rbt12</Label>
              <Input
                disabled={inicio}
                required
                placeholder="R$ 0,00"
                style={{ width: '190px' }}
                value={Rbt12.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                name="Rbt12"
                onChange={handleChangefat}
              />
            </FormGroup>

            {/* Fat mensal */}
            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="Rbap">Faturamento Mensal</Label>
              <Input
                required
                placeholder="R$ 0,00"
                style={{ width: '190px' }}
                value={Rbap.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                name="Rbap"
                onChange={handleChangeRbap}
              />
            </FormGroup>

          </section>

          {/* Calc */}
          <Button type="submit" onClick={handleSubmit}>
            Calcular
          </Button>

          {/* Limpar */}
          <Button
            type="submit"
            onClick={() => window.location.reload()}
            style={{ marginLeft: '6px' }}
          >
            Limpar Formulário
          </Button>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)'}}>

          <div>
            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="aliquotaNominal">Alíquota Nominal</Label>
              <Input
                required
                placeholder="0,00 %"
                style={{ width: '190px' }}
                name="aliquotaNominal"
                value={`${aliquotaNominal} %`}
                disabled
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="aliquotaEfetiva">Alíquota Efetiva</Label>
              <Input
                required
                placeholder="0,00 %"
                style={{ width: '190px' }}
                name="aliquotaEfetiva"
                value={`${aliquotaEfetiva} %`}
                disabled
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="faixa">Faixa</Label>
              <Input
                required
                placeholder="Faixa"
                style={{ width: '190px' }}
                value={`Faixa ${faixa}`}
                name="faixa"
                disabled
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="deducao">Dedução</Label>
              <Input
                required
                placeholder="R$ 0,00"
                style={{ width: '190px' }}
                name="deducao"
                value={`${deducao.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}
                disabled
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="das">DAS</Label>
              <Input
                required
                placeholder="R$ 0,00"
                style={{ width: '190px' }}
                name="das"
                value={`${das.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}
                disabled
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="aliquotaIss">Aliquota sem ISS</Label>
                  <Input
                    required
                    placeholder="R$ 0,00"
                    style={{ width: '190px' }}
                    name="aliquotaIss"
                    value={`${tiraIss}%`}
                    disabled
                  />
                </FormGroup>
            </div>
            
            <div id='infosProvedor'>
                <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="aliquotaNominalProvedor">Alíquota Nominal</Label>
                  <Input
                    required
                    placeholder="0,00 %"
                    style={{ width: '190px' }}
                    name="aliquotaNominalProvedor"
                    value={`${aliquotaNominalProvedor} %`}
                    disabled
                  />
                </FormGroup>

                <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="aliquotaEfetivaProvedor">Alíquota Efetiva</Label>
                  <Input
                    required
                    placeholder="0,00 %"
                    style={{ width: '190px' }}
                    name="aliquotaEfetivaProvedor"
                    value={`${aliquotaEfetivaProvedor} %`}
                    disabled
                  />
                </FormGroup>

                <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="faixaProvedor">Faixa</Label>
                  <Input
                    required
                    placeholder="Faixa"
                    style={{ width: '190px' }}
                    value={`Faixa ${faixaProvedor}`}
                    name="faixaProvedor"
                    disabled
                  />
                </FormGroup>

                <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="deducaoProvedor">Dedução</Label>
                  <Input
                    required
                    placeholder="R$ 0,00"
                    style={{ width: '190px' }}
                    name="deducaoProvedor"
                    value={`${deducaoProvedor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}
                    disabled
                  />
                </FormGroup>

                <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="dasProvedor">DAS</Label>
                  <Input
                    required
                    placeholder="R$ 0,00"
                    style={{ width: '190px' }}
                    name="dasProvedor"
                    value={`${dasProvedor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}
                    disabled
                  />
                </FormGroup>

                
                <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="percentICMS">Percentual do ICMS</Label>
                  <Input
                    required
                    placeholder="R$ 0,00"
                    style={{ width: '190px' }}
                    name="percentICMS"
                    value={`${percentualIcms}%`}
                    disabled
                  />
                </FormGroup>
                </div>

                <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="aliquotaProvedor">Aliquota do Provedor</Label>
                  <Input
                    required
                    placeholder="R$ 0,00"
                    style={{ width: '190px' }}
                    name="aliquotaProvedor"
                    value={`${aliquotaProvedor}%`}
                    disabled
                  />
                </FormGroup>

                <FormGroup style={{ marginLeft: '5px' }}>
                  <Label for="valorImposto">Valor do Imposto</Label>
                  <Input
                    required
                    placeholder="R$ 0,00"
                    style={{ width: '190px' }}
                    name="valorImposto"
                    value={`${valorImposto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}
                    disabled
                  />
                </FormGroup>

    </section>

          
          {!fatorR && (
            <FormGroup style={{ marginLeft: '5px', marginTop: '18px' }}>
              <Label for="massaSalarial">Massa Salarial</Label>
              <Input
                required
                placeholder="R$ 0,00"
                style={{ width: '190px', backgroundColor: 'orange' }}
                name="massaSalarial"
                value={`R$ ${massaSalarial}`}
                disabled={fatorR}
              />
              {/* {variacaoR && <span style={{marginTop: "4px", color: 'red'}}>Variação R: <strong>{`${variacaoR * 100} %`}</strong></span>}<p/>
              <Button type='button' onClick={handleClickMassaSalarial} style={{marginTop: '10px'}}>Recalcular Valores</Button> */}
            </FormGroup>
          )}
        </Form>{' '}
        {faixa > 0 && <Tabela faixa={faixa} array={anexo} />}
        {faixa > 0 && provedor && <Tabela faixa={faixa} array={AnexoIII} />}
      </>
    );
  }
  else
  {
    return (
      <>
        <Form style={{ margin: '60px' }}>
          <FormGroup>
            <Label for="tableSelect">Anexo:</Label>
            <Input
              id="tableSelect"
              name="tableSelect"
              type="select"
              style={{ width: '385px' }}
              value={select}
              onChange={handleSelect}
            >
              <option value="" selected>
                --Selecione--
              </option>
              <option value="anexoI">Anexo I</option>
              <option value="anexoII">Anexo II</option>
              <option value="anexoIII">Anexo III</option>
              <option value="anexoIV">Anexo IV</option>
              <option value="anexoV">Anexo V</option>
            </Input>
          </FormGroup>
  
          <FormGroup check style={{ marginTop: '35px', marginBottom: '35px' }}>
            <Input type="checkbox" onChange={onChangeChek} value={inicio} />{' '}
            <Label check>Faturamento Acima de 12 meses</Label>
          </FormGroup>

          <FormGroup check style={{ marginTop: '35px', marginBottom: '35px' }}>
            <Input type="checkbox" onChange={onChangeChekProvedor} value={inicio} />{' '}
            <Label check>Provedor</Label>
          </FormGroup>
  
          <FormGroup>
            <Label for="receitasAcumuladas">Receitas Acumuladas</Label>
            <Input
              disabled={!inicio}
              required
              placeholder="R$ 0,00"
              style={{ width: '190px' }}
              value={receitasAcumuladas}
              name="receitasAcumuladas"
              onChange={handleChangeReceitasAcumuladas}
            />
          </FormGroup>
  
          <FormGroup>
            <Label for="mesesfaturamento">Meses de Faturamento</Label>
            <Input
              disabled={!inicio}
              required
              placeholder="0"
              style={{ width: '190px' }}
              value={numMesesCorridos}
              name="receitasAcumuladas"
              onChange={handleChangeMesesFaturamento}
            />
            <Button
              style={{ marginTop: '8px' }}
              type="button"
              onClick={handleSubmitTotalizar}
            >
              Totalizar
            </Button>
          </FormGroup>
  
          <section style={{ display: 'flex' }}>
            <FormGroup>
              <Label for="Rbt12">Rbt12</Label>
              <Input
                disabled={inicio}
                required
                placeholder="R$ 0,00"
                style={{ width: '190px' }}
                value={Rbt12}
                name="Rbt12"
                onChange={handleChangefat}
              />
            </FormGroup>
  
            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="Rbap">Faturamento Mensal</Label>
              <Input
                required
                placeholder="R$ 0,00"
                style={{ width: '190px' }}
                value={Rbap}
                name="Rbap"
                onChange={handleChangeRbap}
              />
            </FormGroup>
  
            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="aliquotaNominal">Alíquota Nominal</Label>
              <Input
                required
                placeholder="0,00 %"
                style={{ width: '190px' }}
                name="aliquotaNominal"
                value={`${aliquotaNominal} %`}
                disabled
              />
            </FormGroup>
  
            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="aliquotaEfetiva">Alíquota Efetiva</Label>
              <Input
                required
                placeholder="0,00 %"
                style={{ width: '190px' }}
                name="aliquotaEfetiva"
                value={`${aliquotaEfetiva} %`}
                disabled
              />
            </FormGroup>
  
            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="faixa">Faixa</Label>
              <Input
                required
                placeholder="Faixa"
                style={{ width: '190px' }}
                value={`Faixa ${faixa}`}
                name="faixa"
                disabled
              />
            </FormGroup>
  
            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="deducao">Dedução</Label>
              <Input
                required
                placeholder="R$ 0,00"
                style={{ width: '190px' }}
                name="deducao"
                value={`R$ ${deducao}`}
                disabled
              />
            </FormGroup>
  
            <FormGroup style={{ marginLeft: '5px' }}>
              <Label for="das">DAS</Label>
              <Input
                required
                placeholder="R$ 0,00"
                style={{ width: '190px' }}
                name="das"
                value={` ${das.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}
                disabled
              />
            </FormGroup>

          </section>
  
          <Button type="submit" onClick={handleSubmit}>
            Calcular
          </Button>
          <Button
            type="submit"
            onClick={() => window.location.reload()}
            style={{ marginLeft: '6px' }}
          >
            Limpar Formulário
          </Button>
          {!fatorR && (
            <FormGroup style={{ marginLeft: '5px', marginTop: '18px' }}>
              <Label for="massaSalarial">Massa Salarial</Label>
              <Input
                required
                placeholder="R$ 0,00"
                style={{ width: '190px', backgroundColor: 'orange' }}
                name="massaSalarial"
                value={`R$ ${massaSalarial}`}
                disabled={fatorR}
              />
              {/* {variacaoR && <span style={{marginTop: "4px", color: 'red'}}>Variação R: <strong>{`${variacaoR * 100} %`}</strong></span>}<p/>
              <Button type='button' onClick={handleClickMassaSalarial} style={{marginTop: '10px'}}>Recalcular Valores</Button> */}
            </FormGroup>
          )}
        </Form>{' '}
        {faixa > 0 && <Tabela faixa={faixa} array={anexo} />}
      </>
    );
  }
}
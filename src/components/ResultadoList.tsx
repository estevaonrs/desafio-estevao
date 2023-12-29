import React, { useState, useEffect } from 'react';
import axios from 'axios';

const disciplinaColors: { [key: string]: string } = {
  Biologia: '#CC4090',
  Artes: '#05A2C2',
  Geografia: '#C26719',
  Sociologia: '#9B19C2',
};

interface Resultado {
  id: string;
  bimestre: string;
  disciplina: string;
  nota: number;
  criadoEm: string;
  atualizadoEm: string;
}

const ResultadoList: React.FC = () => {
  // Adicione um estado para controlar a exibição do formulário
  const [showForm, setShowForm] = useState<boolean>(false);

  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [novaDisciplina, setNovaDisciplina] = useState<string>('');
  const [novaNota, setNovaNota] = useState<number | ''>('');
  const [novoBimestre, setNovoBimestre] = useState<string>('');

  const getBimestreNumero = (bimestre: string) => {
    switch (bimestre) {
      case 'PRIMEIRO':
        return 1;
      case 'SEGUNDO':
        return 2;
      case 'TERCEIRO':
        return 3;
      case 'QUARTO':
        return 4;
      default:
        return 0; // Trate outros casos conforme necessário
    }
  };

  useEffect(() => {
    // Carregue os resultados do servidor quando o componente montar
    fetchResultados();
  }, []);

  const fetchResultados = async () => {
    try {
      const response = await axios.get('http://localhost:3000/resultados');
      setResultados(response.data);
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
    }
  };

  const handleAddDisciplina = async () => {
    try {
      if (!novaDisciplina || novaNota === '' || novaNota < 0 || novaNota > 10 || !novoBimestre) {
        console.error('Dados inválidos. Preencha corretamente.');
        return;
      }

      const response = await axios.post('http://localhost:3000/resultados', {
        disciplina: novaDisciplina,
        nota: novaNota,
        bimestre: novoBimestre,
      });

      if (response.status === 200 || response.status === 201) {
        fetchResultados();
        setNovaDisciplina('');
        setNovaNota('');
        setNovoBimestre('');
        console.log('Disciplina adicionada com sucesso!');
      } else {
        console.error('Erro ao adicionar disciplina. Status:', response.status);
        console.error(response.data); // Exibe detalhes do erro no console
        console.log('Erro ao adicionar disciplina. Verifique o console para mais detalhes.');
      }
    } catch (error: any) {
      console.error('Erro ao adicionar disciplina:', error.response?.data || error.message);
    }
  };

  const handleRemoveDisciplina = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/resultados/${id}`);
      fetchResultados();
      console.log('Disciplina removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover disciplina:', error);
    }
  };

  const renderDisciplinas = (bimestre: string) => {
    const disciplinasDoBimestre = resultados.filter((r) => r.bimestre === bimestre);
  
    return disciplinasDoBimestre.map((disciplinaResultado) => (
      <div
        key={disciplinaResultado.id}
        style={{
          border: `1px solid ${disciplinaColors[disciplinaResultado.disciplina]}`,
          padding: '10px',
          marginBottom: '20px', // Ajustado para garantir espaçamento entre os quadrados
          borderRadius: '20px',
          position: 'relative',
          background: disciplinaColors[disciplinaResultado.disciplina],
          width: '158px',
          height: '146px',
          boxSizing: 'border-box', // Garante que as bordas e o preenchimento não aumentem o tamanho real
          marginRight: '20px', // Espaçamento entre os quadrados no desktop
          textAlign: 'left',
        }}
      >
        <p style={{ fontSize: '18px', marginBottom: '-10px' }}>{disciplinaResultado.disciplina}</p>
        <p style={{ fontSize: '12px', textAlign: 'left' }}>{formatDate(disciplinaResultado.criadoEm)}</p>
        <div style={{ background: 'rgba(15, 15, 15, 0.7)', padding: '5px',  width: '180px', boxSizing: 'border-box', marginLeft: "-11px",  }}>
          <p style={{ fontSize: '14px', color: '#FF5964', margin: 0 }}>Nota: {disciplinaResultado.nota}</p>
        </div>
        <button
          style={{
            background: 'red',
            position: 'absolute',
            top: '5px',
            right: '5px',
            border: 'none',
            padding: '5px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onClick={() => handleRemoveDisciplina(disciplinaResultado.id)}
        >
          🗑️
        </button>
      </div>
    ));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam do zero
    const year = date.getFullYear().toString();
    
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={{ background: '#0F0F0F', color: 'white', padding: '20px', textAlign: 'center' }}>
      {/* Adicione o botão de adicionar nova disciplina aqui */}
      <div>
        <h2>Adicionar Nova Disciplina</h2>
        {/* Use o estado showForm para controlar a exibição do formulário */}
        {showForm ? (
          <form>
            {/* Restante do formulário aqui */}
            <label>
              Disciplina:
              <select
                value={novaDisciplina}
                onChange={(e) => setNovaDisciplina(e.target.value)}
              >
                <option value="">Selecione uma disciplina</option>
                <option value="Biologia">Biologia</option>
                <option value="Artes">Artes</option>
                <option value="Geografia">Geografia</option>
                <option value="Sociologia">Sociologia</option>
              </select>
            </label>
            <label>
              Nota:
              <input
                type="number"
                value={novaNota}
                onChange={(e) => setNovaNota(Number(e.target.value))}
              />
            </label>
            <label>
              Bimestre:
              <select
                value={novoBimestre}
                onChange={(e) => setNovoBimestre(e.target.value)}
              >
                <option value="">Selecione um bimestre</option>
                <option value="PRIMEIRO">1</option>
                <option value="SEGUNDO">2</option>
                <option value="TERCEIRO">3</option>
                <option value="QUARTO">4</option>
              </select>
            </label>
            <button type="button" onClick={handleAddDisciplina} style={{ background: 'yellow' }}>
              Adicionar
            </button>
          </form>
        ) : (
          // Botão de + para mostrar o formulário
          <button onClick={() => setShowForm(true)} style={{ background: 'yellow', padding: '5px', cursor: 'pointer' }}>
            +
          </button>
        )}
      </div>

      {resultados.length === 0 ? (
        <p>Nenhum resultado encontrado.</p>
      ) : (
        <div style={{ margin: '0 auto', display: 'inline-block' }}>
          {[...new Set(resultados.map((r) => r.bimestre))]
            .sort((a, b) => getBimestreNumero(a) - getBimestreNumero(b))
            .map((bimestre) => (
              <div key={bimestre} style={{ marginBottom: '20px', textAlign: 'left', position: 'relative' }}>
                <h1>Bimestre {getBimestreNumero(bimestre)}</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {renderDisciplinas(bimestre)}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ResultadoList;

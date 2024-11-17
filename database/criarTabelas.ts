const criarTabelas = () => {
    db.transaction((tx) => {
      // Criando a tabela de Pacientes
      //c
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS pacientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          idade INTEGER,
          genero TEXT
        );`,
        [],
        () => {
          console.log('Tabela de Pacientes criada com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao criar a tabela de Pacientes:', error);
          return false;
        }
      );
  
      // Criando a tabela de Agendamentos
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS agendamentos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          paciente_id INTEGER,
          data TEXT,
          hora TEXT,
          FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
        );`,
        [],
        () => {
          console.log('Tabela de Agendamentos criada com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao criar a tabela de Agendamentos:', error);
          return false;
        }
      );
    });
  };
  
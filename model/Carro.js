const sqlite3 = require('sqlite3').verbose();
const path = require("path");

module.exports = class Carro{
	
	constructor(){
		
	}
	
conectar()
{	
	const db_name = path.join("","db","teste.sqlite");
	return new sqlite3.Database(db_name, err => {
		if (err) {
			return console.error(err.message);
		}
	});
}

listar(res)
{
  const db = this.conectar();	
  const sql = "SELECT * FROM tb_carros ORDER BY Marca"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    return res.json({ 
		rows
	});
  });
}

buscar(id,res)
{
	const db = this.conectar();	
	const sql = "SELECT * FROM tb_carros where Id = ?";
	db.all(sql,id, (err, rows) => {
		if (err) {
			return console.error(err.message);
		}
		return res.json({ 
			rows 
		});
  });
}

criar(car,res)
{
	const db = this.conectar();	
	const sql = "INSERT INTO tb_carros(Placa,Chassi,Renavam,Modelo,Marca,Ano)VALUES(?,?,?,?,?,?)";
		if(!car)
		{
			return res.json({status:"erro",mensagem:"Carro invalido"});
		}
		if(car[0].length < 7 )
		{
			return res.json({status:"erro",mensagem:"Placa invalido"});
		}
		else if(car[1].length < 6 )
		{
			return res.json({status:"erro",mensagem:"Chassi invalido"});
		}
		else if(car[2].length < 11 )
		{
			return res.json({status:"erro",mensagem:"Renavam invalido"});
		}
		else if(car[3].length < 5 )
		{
			return res.json({status:"erro",mensagem:"Modelo invalido"});
		}
		else if(car[4].length < 3 )
		{
			return res.json({status:"erro",mensagem:"Marca invalido"});
		}
		else if(Number(car[5]) < 1900)
		{
			return res.json({status:"erro",mensagem:"Ano invalido"});
		}
	
	db.run(sql,car, err => {
		if (!err)
		{
			return res.json({
				status:"ok",
				mensagem:"Salvo com sucesso"
			});	
		}
		else{
			return res.json({
				status:"erro",
				mensagem:err
			});	
		}
  });
}

atualizar(car,res)
{
	const db = this.conectar();	
	const sql = "update tb_carros set Placa = ? ,Chassi = ? ,Renavam = ? ,Modelo = ?,Marca = ?,Ano = ? where Id=?";
		if(!car)
		{
			return res.json({status:"erro",mensagem:"Carro invalido"});
		}
		if(car[0].length < 7 )
		{
			return res.json({status:"erro",mensagem:"Placa invalido"});
		}
		else if(car[1].length < 6 )
		{
			return res.json({status:"erro",mensagem:"Chassi invalido"});
		}
		else if(car[2].length < 11 )
		{
			return res.json({status:"erro",mensagem:"Renavam invalido"});
		}
		else if(car[3].length < 5 )
		{
			return res.json({status:"erro",mensagem:"Modelo invalido"});
		}
		else if(car[4].length < 3 )
		{
			return res.json({status:"erro",mensagem:"Marca invalido"});
		}
		else if(Number(car[5]) < 1900)
		{
			return res.json({status:"erro",mensagem:"Ano invalido"});
		}
		else if(Number(car[6]) < 1)
		{
			return res.json({status:"erro",mensagem:"Id invalido"});
		}
	
	db.run(sql,car, err => {
    if (!err)
	{
		return res.json({
			status:"ok",
			mensagem:"Atualizado com sucesso"
		});	
	}
	else{
		return res.json({
			status:"erro",
			mensagem:err
		});	
	}
  });
}

deletar(id,res)
{
  const db = this.conectar();	
  const sql = "DELETE FROM tb_carros WHERE Id = ?";
  db.run(sql, id, err => {
	    if (!err)
	{
		return res.json({
			status:"ok",
			mensagem:"Deletado com sucesso"
		});	
	}
	else{
		return res.json({
			status:"erro",
			mensagem:err
		});	
	}
  
  });
}
	
	
}

const express = require("express");
const router = express.Router();
const mysql = require("../Mysql").pool;

//Retorna todos os usuários
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query("SELECT * FROM usuario", (error, result, fields) => {
      if (error) {
        return res.status(500).send({
          error: error,
        });
      }
      return res
        .status(201)
        .send({ resultado: result, mensagem: "Listando todos usuários" });
    });
  });
});

//Insere um usuário
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      `INSERT INTO usuario (nome, sobrenome, estado, cidade, email, telefone, celular, login_id) 
        VALUES (?,?,?,?,?,?,?,?)`,
      [
        req.body.nome,
        req.body.sobrenome,
        req.body.estado,
        req.body.cidade,
        req.body.email,
        req.body.telefone,
        req.body.celular,
        req.body.login_id,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        res.status(201).send({
          mensagem: "Usuário cadastrado com sucesso",
        });
      }
    );
  });
});

//Retorna um usuário especifico
router.get("/:id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      "SELECT * FROM usuario WHERE id = ?",
      [req.params.id],

      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }
        return res
          .status(201)
          .send({ resultado: result, mensagem: "Lista de usuários" });
      }
    );
  });
});

//Altera um usuário
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      `UPDATE usuario SET 
        nome = ?,
        sobrenome = ?, 
        estado = ?,
        cidade = ?, 
        email = ?, 
        telefone = ?, 
        celular = ? WHERE id = ?`,
      [
        req.body.nome,
        req.body.sobrenome,
        req.body.estado,
        req.body.cidade,
        req.body.email,
        req.body.telefone,
        req.body.celular,
        req.body.id,
      ],

      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }
        return res.status(202).send({
          mensagem: "Usuário atualizado com sucesso",
        });
      }
    );
  });
});

//Deleta um usuário
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      `DELETE FROM usuario where id = ?`,
      [req.body.id],

      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }
        return res.status(202).send({
          mensagem: "Usuário removido com sucesso",
        });
      }
    );
  });
});

module.exports = router;

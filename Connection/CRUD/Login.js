const express = require("express");
const router = express.Router();
const mysql = require("../Mysql").pool;

//Retorna todos os logins
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query("SELECT * FROM login", (error, result, fields) => {
      if (error) {
        return res.status(500).send({
          error: error,
        });
      }
      return res
        .status(201)
        .send({ resultado: result, mensagem: "Listando todos logins" });
    });
  });
});

//Insere um login
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      `INSERT INTO login (login, senha) 
        VALUES (?,?)`,
      [req.body.login, req.body.senha],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        res.status(201).send({
          mensagem: "Login inserido com sucesso",
        });
      }
    );
  });
});

//Retorna um login especifico
router.get("/:id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      "SELECT * FROM login WHERE id = ?",
      [req.params.id],

      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }
        return res
          .status(201)
          .send({ resultado: result, mensagem: "Lista de logins" });
      }
    );
  });
});

//Altera um login
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      `UPDATE login SET login = ?, senha = ? WHERE id = ?`,
      [req.body.login, req.body.senha, req.body.id],

      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }
        return res.status(202).send({
          mensagem: "Login atualizado com sucesso",
        });
      }
    );
  });
});

//Deleta um login
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      `DELETE FROM login where id = ?`,
      [req.body.id],

      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }
        return res.status(202).send({
          mensagem: "Login removido com sucesso",
        });
      }
    );
  });
});

module.exports = router;

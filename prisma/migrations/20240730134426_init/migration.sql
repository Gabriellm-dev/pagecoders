-- CreateTable
CREATE TABLE "Usuario" (
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "rua" TEXT,
    "numero" INTEGER,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "cep" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Livro" (
    "codigo" SERIAL NOT NULL,
    "fk_usuario_cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "editora" TEXT,
    "data_publicacao" TIMESTAMP(3),
    "num_edicao" INTEGER,
    "autor_es" TEXT,
    "genero" TEXT,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id_emprestimo" SERIAL NOT NULL,
    "fk_usuario_cpf" TEXT NOT NULL,
    "fk_livro_codigo" INTEGER NOT NULL,
    "data_emprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_prevista_devolucao" TIMESTAMP(3),
    "data_devolucao" TIMESTAMP(3),
    "emprestimo_autorizado" BOOLEAN NOT NULL DEFAULT false,
    "emprestimo_solicitado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("id_emprestimo")
);

-- CreateTable
CREATE TABLE "AvaliacaoEmprestimo" (
    "cod_avaliacao" SERIAL NOT NULL,
    "fk_emprestimo_id" INTEGER NOT NULL,
    "classif_livro" INTEGER NOT NULL,
    "classif_usuario" INTEGER NOT NULL,
    "comentario" TEXT,

    CONSTRAINT "AvaliacaoEmprestimo_pkey" PRIMARY KEY ("cod_avaliacao")
);

-- CreateTable
CREATE TABLE "ClassificacaoUsuario" (
    "fk_usuario_cpf" TEXT NOT NULL,
    "fk_avaliacao_cod" INTEGER NOT NULL,

    CONSTRAINT "ClassificacaoUsuario_pkey" PRIMARY KEY ("fk_usuario_cpf","fk_avaliacao_cod")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_fk_usuario_cpf_fkey" FOREIGN KEY ("fk_usuario_cpf") REFERENCES "Usuario"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_fk_usuario_cpf_fkey" FOREIGN KEY ("fk_usuario_cpf") REFERENCES "Usuario"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_fk_livro_codigo_fkey" FOREIGN KEY ("fk_livro_codigo") REFERENCES "Livro"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoEmprestimo" ADD CONSTRAINT "AvaliacaoEmprestimo_fk_emprestimo_id_fkey" FOREIGN KEY ("fk_emprestimo_id") REFERENCES "Emprestimo"("id_emprestimo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassificacaoUsuario" ADD CONSTRAINT "ClassificacaoUsuario_fk_usuario_cpf_fkey" FOREIGN KEY ("fk_usuario_cpf") REFERENCES "Usuario"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassificacaoUsuario" ADD CONSTRAINT "ClassificacaoUsuario_fk_avaliacao_cod_fkey" FOREIGN KEY ("fk_avaliacao_cod") REFERENCES "AvaliacaoEmprestimo"("cod_avaliacao") ON DELETE RESTRICT ON UPDATE CASCADE;

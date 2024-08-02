/*
  Warnings:

  - The primary key for the `AvaliacaoEmprestimo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classif_livro` on the `AvaliacaoEmprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `classif_usuario` on the `AvaliacaoEmprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `cod_avaliacao` on the `AvaliacaoEmprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `fk_emprestimo_id` on the `AvaliacaoEmprestimo` table. All the data in the column will be lost.
  - The primary key for the `ClassificacaoUsuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fk_avaliacao_cod` on the `ClassificacaoUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `fk_usuario_cpf` on the `ClassificacaoUsuario` table. All the data in the column will be lost.
  - The primary key for the `Emprestimo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data_devolucao` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `data_emprestimo` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `data_prevista_devolucao` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `emprestimo_autorizado` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `emprestimo_solicitado` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `fk_livro_codigo` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `fk_usuario_cpf` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `id_emprestimo` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `autor_es` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `data_publicacao` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `fk_usuario_cpf` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `num_edicao` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `data_cadastro` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `fkEmprestimoId` to the `AvaliacaoEmprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkAvaliacaoCod` to the `ClassificacaoUsuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkUsuarioCpf` to the `ClassificacaoUsuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkLivroCodigo` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkUsuarioCpf` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkUsuarioCpf` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AvaliacaoEmprestimo" DROP CONSTRAINT "AvaliacaoEmprestimo_fk_emprestimo_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassificacaoUsuario" DROP CONSTRAINT "ClassificacaoUsuario_fk_avaliacao_cod_fkey";

-- DropForeignKey
ALTER TABLE "ClassificacaoUsuario" DROP CONSTRAINT "ClassificacaoUsuario_fk_usuario_cpf_fkey";

-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_fk_livro_codigo_fkey";

-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_fk_usuario_cpf_fkey";

-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_fk_usuario_cpf_fkey";

-- AlterTable
ALTER TABLE "AvaliacaoEmprestimo" DROP CONSTRAINT "AvaliacaoEmprestimo_pkey",
DROP COLUMN "classif_livro",
DROP COLUMN "classif_usuario",
DROP COLUMN "cod_avaliacao",
DROP COLUMN "fk_emprestimo_id",
ADD COLUMN     "classifLivro" INTEGER,
ADD COLUMN     "classifUsuario" INTEGER,
ADD COLUMN     "codAvaliacao" SERIAL NOT NULL,
ADD COLUMN     "fkEmprestimoId" INTEGER NOT NULL,
ADD CONSTRAINT "AvaliacaoEmprestimo_pkey" PRIMARY KEY ("codAvaliacao");

-- AlterTable
ALTER TABLE "ClassificacaoUsuario" DROP CONSTRAINT "ClassificacaoUsuario_pkey",
DROP COLUMN "fk_avaliacao_cod",
DROP COLUMN "fk_usuario_cpf",
ADD COLUMN     "fkAvaliacaoCod" INTEGER NOT NULL,
ADD COLUMN     "fkUsuarioCpf" TEXT NOT NULL,
ADD CONSTRAINT "ClassificacaoUsuario_pkey" PRIMARY KEY ("fkUsuarioCpf", "fkAvaliacaoCod");

-- AlterTable
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_pkey",
DROP COLUMN "data_devolucao",
DROP COLUMN "data_emprestimo",
DROP COLUMN "data_prevista_devolucao",
DROP COLUMN "emprestimo_autorizado",
DROP COLUMN "emprestimo_solicitado",
DROP COLUMN "fk_livro_codigo",
DROP COLUMN "fk_usuario_cpf",
DROP COLUMN "id_emprestimo",
ADD COLUMN     "dataDevolucao" TIMESTAMP(3),
ADD COLUMN     "dataEmprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataPrevistaDevolucao" TIMESTAMP(3),
ADD COLUMN     "emprestimoAutorizado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emprestimoSolicitado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "fkLivroCodigo" INTEGER NOT NULL,
ADD COLUMN     "fkUsuarioCpf" TEXT NOT NULL,
ADD COLUMN     "idEmprestimo" SERIAL NOT NULL,
ADD CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("idEmprestimo");

-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "autor_es",
DROP COLUMN "data_publicacao",
DROP COLUMN "fk_usuario_cpf",
DROP COLUMN "num_edicao",
ADD COLUMN     "autorEs" TEXT,
ADD COLUMN     "dataPublicacao" TIMESTAMP(3),
ADD COLUMN     "fkUsuarioCpf" TEXT NOT NULL,
ADD COLUMN     "numEdicao" INTEGER;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "data_cadastro",
ADD COLUMN     "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_fkUsuarioCpf_fkey" FOREIGN KEY ("fkUsuarioCpf") REFERENCES "Usuario"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_fkUsuarioCpf_fkey" FOREIGN KEY ("fkUsuarioCpf") REFERENCES "Usuario"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_fkLivroCodigo_fkey" FOREIGN KEY ("fkLivroCodigo") REFERENCES "Livro"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoEmprestimo" ADD CONSTRAINT "AvaliacaoEmprestimo_fkEmprestimoId_fkey" FOREIGN KEY ("fkEmprestimoId") REFERENCES "Emprestimo"("idEmprestimo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassificacaoUsuario" ADD CONSTRAINT "ClassificacaoUsuario_fkUsuarioCpf_fkey" FOREIGN KEY ("fkUsuarioCpf") REFERENCES "Usuario"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassificacaoUsuario" ADD CONSTRAINT "ClassificacaoUsuario_fkAvaliacaoCod_fkey" FOREIGN KEY ("fkAvaliacaoCod") REFERENCES "AvaliacaoEmprestimo"("codAvaliacao") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `AvaliacaoEmprestimo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassificacaoUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Emprestimo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Livro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvaliacaoEmprestimo" DROP CONSTRAINT "AvaliacaoEmprestimo_fkEmprestimoId_fkey";

-- DropForeignKey
ALTER TABLE "ClassificacaoUsuario" DROP CONSTRAINT "ClassificacaoUsuario_fkAvaliacaoCod_fkey";

-- DropForeignKey
ALTER TABLE "ClassificacaoUsuario" DROP CONSTRAINT "ClassificacaoUsuario_fkUsuarioCpf_fkey";

-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_fkLivroCodigo_fkey";

-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_fkUsuarioCpf_fkey";

-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_fkUsuarioCpf_fkey";

-- DropTable
DROP TABLE "AvaliacaoEmprestimo";

-- DropTable
DROP TABLE "ClassificacaoUsuario";

-- DropTable
DROP TABLE "Emprestimo";

-- DropTable
DROP TABLE "Livro";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "User" (
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "street" TEXT,
    "number" INTEGER,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Book" (
    "code" SERIAL NOT NULL,
    "userCpf" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publisher" TEXT,
    "publicationDate" TIMESTAMP(3),
    "editionNumber" INTEGER,
    "authors" TEXT,
    "genre" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Loan" (
    "loanId" SERIAL NOT NULL,
    "userCpf" TEXT NOT NULL,
    "bookCode" INTEGER NOT NULL,
    "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedReturnDate" TIMESTAMP(3),
    "returnDate" TIMESTAMP(3),
    "loanAuthorized" BOOLEAN NOT NULL DEFAULT false,
    "loanRequested" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("loanId")
);

-- CreateTable
CREATE TABLE "LoanRating" (
    "ratingId" SERIAL NOT NULL,
    "loanId" INTEGER NOT NULL,
    "bookRating" INTEGER,
    "userRating" INTEGER,
    "comment" TEXT,

    CONSTRAINT "LoanRating_pkey" PRIMARY KEY ("ratingId")
);

-- CreateTable
CREATE TABLE "UserRating" (
    "userCpf" TEXT NOT NULL,
    "ratingId" INTEGER NOT NULL,

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("userCpf","ratingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "Book"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRating" ADD CONSTRAINT "LoanRating_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("loanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "LoanRating"("ratingId") ON DELETE RESTRICT ON UPDATE CASCADE;

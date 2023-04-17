using System;

namespace EX2
{
    class Program
    {
        static void Main(string[] args)
        {
            Funcionario funcionario = new Funcionario();

            System.Console.WriteLine();
            System.Console.Write("Digite o nome do funcionário: ");
            funcionario.Nome = Console.ReadLine();
            System.Console.Write("Digite o salário: ");
            funcionario.SalarioBruto = double.Parse(Console.ReadLine());
            System.Console.Write("Digite o valor do imposto: ");
            funcionario.Imposto = double.Parse(Console.ReadLine());

            System.Console.WriteLine();
            System.Console.WriteLine(funcionario);

            System.Console.WriteLine();
            System.Console.Write("Digite a porcentagem para aumentar o salário: ");
            double porcentagem = double.Parse(Console.ReadLine());

            System.Console.WriteLine();
            funcionario.AumentarSalario(porcentagem);

            System.Console.WriteLine(funcionario);
            System.Console.WriteLine();

        }
    }
}

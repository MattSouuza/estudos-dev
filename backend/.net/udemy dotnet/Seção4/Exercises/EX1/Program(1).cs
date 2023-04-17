using System;

namespace EX1
{
    class Program
    {
        static void Main(string[] args)
        {
            Retangulo retangulo = new Retangulo();

            System.Console.WriteLine("Entre a largura e altura do retângulo: ");
            retangulo.Largura = double.Parse(Console.ReadLine());
            retangulo.Altura = double.Parse(Console.ReadLine());

            System.Console.WriteLine();
            System.Console.WriteLine("Área = " + retangulo.Area().ToString("F2"));
            System.Console.WriteLine("Perímetro = " + retangulo.Perimetro().ToString("F2"));
            System.Console.WriteLine("Diagonal = " + retangulo.Diagonal().ToString("F2"));
        }
    }
}

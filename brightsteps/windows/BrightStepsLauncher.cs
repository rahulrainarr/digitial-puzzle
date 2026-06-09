using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

internal static class BrightStepsLauncher
{
    [STAThread]
    private static void Main()
    {
        string appFolder = AppDomain.CurrentDomain.BaseDirectory;
        string appFile = Path.Combine(appFolder, "index.html");
        if (!File.Exists(appFile))
        {
            MessageBox.Show("BrightSteps could not find index.html. Keep the executable in the extracted BrightSteps folder.", "BrightSteps", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return;
        }
        try
        {
            Process.Start(new ProcessStartInfo { FileName = appFile, UseShellExecute = true });
        }
        catch (Exception exception)
        {
            MessageBox.Show("BrightSteps could not open your browser.\n\n" + exception.Message, "BrightSteps", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}

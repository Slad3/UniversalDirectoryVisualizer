package org;

import io.jooby.*;

import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.json.JSONObject;

public class Main {

    public static void main(String[] args) {

        Jooby app = new Jooby();

        // Server
        app.setServerOptions(new ServerOptions()
                .setPort(18989)
        );

        app.decorator(new CorsHandler());

        app.get("/", ctx -> {
            ctx.setResponseType(MediaType.html);

            Map<String, String> dictionary = new HashMap<>();
            dictionary.put("Backend Working update", "true");

            ctx.setResponseType(MediaType.json);
            return new JSONObject(dictionary);
        });

        app.post("/parseDirectory/", ctx -> {
            String directory;
            Formdata form = ctx.form();
            try {
                directory = ctx.form("directory").value();
                System.out.println(directory);
            } catch (Exception e) {
                return new JSONObject(Objects.requireNonNull(new HashMap().put("Error", "No directory found in form")));
            }

            ctx.setResponseType(MediaType.json);
            return new JSONObject(new Driver(directory).parse());
        });

        app.get("/test", ctx -> {
            ctx.setResponseType(MediaType.json);
            return new JSONObject("{\"::meta::\": {\"size\": \"272279922\",\"htmlId\": \"files233354.2127162223\"},\"::files::\": {\"r-cheat-sheet-3.pdf\": 205939,\"The Data Science Handbook.pdf\": 2892868,\"datastyle.pdf\": 1623472,\"conversationsondatascience.pdf\": 286923,\"Guide2DataMining.pdf\": 145369716,\"ESLII_print12.pdf\": 13474466,\"C++ Cheat Sheet.h\": 20807,\"PythonOOP.pdf\": 767008,\"SocialMediaMining.pdf\": 5003034,\"Python Cheat Sheet.py\": 12278},\"Text Files\": {\"::meta::\": {\"size\": \"52844\",\"htmlId\": \"files654602.0372495166\"},\"::files::\": {\"C++ Cheat Sheet.txt\": 20807,\"Python Cheat Sheet.txt\": 12278,\"C# Cheat Sheet.txt\": 19759}},\"Big O\": {\"::meta::\": {\"size\": \"939396\",\"htmlId\": \"files48315.25742833592\"},\"::files::\": {\"DataStructureOptions.png\": 297829,\"ArraySorting.png\": 242717,\"ComplexityChart.png\": 105383,\"BigOCheatSheet.png\": 293467}},\"Machine Learning\": {\"PDFs\": {\"::meta::\": {\"size\": \"10889321\",\"htmlId\": \"files67025.33408309263\"},\"::files::\": {\"Scikit-Learn.pdf\": 149176,\"SciPy-Linear Algebra.pdf\": 149604,\"PySpark_SQL.pdf\": 694537,\"ggplot2.pdf\": 1231368,\"Matplotlib.pdf\": 367923,\"Tensorflow.pdf\": 4285805,\"Data Wrangling with dplyr and tidyr - R Studio.pdf\": 504140,\"Deep Learning Cheat Sheet-Hacker Noon.pdf\": 485203,\"Neural Network Cells.pdf\": 190494,\"Keras.pdf\": 139989,\"PySpark_RDD.pdf\": 676800,\"PySpark.pdf\": 179901,\"Numpy.pdf\": 180597,\"Seaborn.pdf\": 638942,\"Neural Networks Zoo.pdf\": 476226,\"Pandas.pdf\": 175124,\"Neural Network Graphs.pdf\": 363492}},\"::meta::\": {\"size\": \"39639594\",\"htmlId\": \"files208526.3242836647\"},\"::files::\": {\"index.png\": 761520,\"Dask2.png\": 116006,\"Neural Networks Zoo.png\": 720243,\"Numpy.png\": 425302,\"Pandas-2.jpg\": 769292,\"PySpark.jpg\": 636231,\"Keras.jpg\": 675443,\"Neural Network Cells.png\": 284556,\"DeepLearning.png\": 696534,\"Deep Learning Cheat Sheet-Hacker Noon.pdf\": 485203,\"Data Wrangling with dplyr and tidyr - R Studio-1.jpg\": 748737,\"ggplot2-1.jpg\": 875019,\"All Cheat Sheets.pdf\": 11531749,\"Pandas-1.jpg\": 756673,\"PySpark-SQL.png\": 568412,\"TensorFlow.png\": 761520,\"Dask1.png\": 243906,\"NeuralNetworkMath.png\": 1055651,\"Matplotlib.png\": 400907,\"Data Wrangling with dplyr and tidyr - R Studio-2.jpg\": 703999,\"MicrosoftAzureData.png\": 145961,\"ggplot2-2.jpg\": 1006149,\"Scikit Learn.png\": 408955,\"PythonDataScience.png\": 307819,\"Dask4.png\": 136734,\"Scipy.png\": 438011,\"Neural Network Graphs.png\": 575076,\"PySpark-RDD.png\": 579417,\"PythonDataScienceBokeh.png\": 1161194,\"Pandas-3.png\": 367619,\"Dask.pdf\": 203552,\"Dask3.png\": 202883}},\"handson-ml-master\": {\"images\": {\"ann\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files562490.3886788042\"},\"::files::\": {\"README\": 34}},\"fundamentals\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files696067.7316927704\"},\"::files::\": {\"README\": 34}},\"autoencoders\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files47315.12999968474\"},\"::files::\": {\"README\": 34}},\"cnn\": {\"::meta::\": {\"size\": \"181856\",\"htmlId\": \"files477424.4873201189\"},\"::files::\": {\"README\": 34,\"test_image.png\": 181822}},\"deep\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files565605.361197104\"},\"::files::\": {\"README\": 34}},\"unsupervised_learning\": {\"::meta::\": {\"size\": \"574518\",\"htmlId\": \"files471042.9612715563\"},\"::files::\": {\"ladybug.png\": 574484,\"README\": 34}},\"training_linear_models\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files128496.64018113389\"},\"::files::\": {\"README\": 34}},\"end_to_end_project\": {\"::meta::\": {\"size\": \"10068\",\"htmlId\": \"files603513.4705835816\"},\"::files::\": {\"california.png\": 10034,\"README\": 34}},\"distributed\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files815440.7915507966\"},\"::files::\": {\"README\": 34}},\"svm\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files55071.141071266735\"},\"::files::\": {\"README\": 34}},\"classification\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files216941.82728077524\"},\"::files::\": {\"README\": 34}},\"tensorflow\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files253636.1358805008\"},\"::files::\": {\"README\": 34}},\"rnn\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files5570.352196927742\"},\"::files::\": {\"README\": 34}},\"::meta::\": {\"size\": \"766884\",\"htmlId\": \"files42826.70659358633\"},\"::files::\": {},\"decision_trees\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files489687.8599083743\"},\"::files::\": {\"README\": 34}},\"rl\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files641818.7600721905\"},\"::files::\": {\"README\": 34}},\"ensembles\": {\"::meta::\": {\"size\": \"34\",\"htmlId\": \"files870758.6198528302\"},\"::files::\": {\"README\": 34}}},\"::meta::\": {\"size\": \"25603062\",\"htmlId\": \"files427993.30454770534\"},\"::files::\": {\"07_ensemble_learning_and_random_forests.ipynb\": 557120,\"tensorflow_graph_in_jupyter.py\": 2159,\".gitignore\": 195,\"tools_pandas.ipynb\": 452104,\"05_support_vector_machines.ipynb\": 881726,\"06_decision_trees.ipynb\": 205044,\"requirements.txt\": 2389,\"08_dimensionality_reduction.ipynb\": 5779787,\"tools_matplotlib.ipynb\": 1141232,\"15_autoencoders.ipynb\": 347464,\"extra_autodiff.ipynb\": 32603,\"01_the_machine_learning_landscape.ipynb\": 281083,\"13_convolutional_neural_networks.ipynb\": 4855946,\"extra_capsnets-cn.ipynb\": 298968,\"extra_tensorflow_reproducibility.ipynb\": 37213,\"extra_capsnets.ipynb\": 256501,\"LICENSE\": 10175,\"tools_numpy.ipynb\": 635088,\"11_deep_learning.ipynb\": 460076,\"14_recurrent_neural_networks.ipynb\": 670611,\"index.ipynb\": 4349,\"ml-project-checklist.md\": 7689,\"02_end_to_end_machine_learning_project.ipynb\": 1224050,\"04_training_linear_models.ipynb\": 855175,\"environment.yml\": 1415,\"10_introduction_to_artificial_neural_networks.ipynb\": 270247,\"future_encoders.py\": 60135,\"09_up_and_running_with_tensorflow.ipynb\": 203686,\"README.md\": 8217,\"16_reinforcement_learning.ipynb\": 1458038,\"03_classification.ipynb\": 444268,\"12_distributed_tensorflow.ipynb\": 24726,\"math_linear_algebra.ipynb\": 673488,\"book_equations.ipynb\": 48616,\"extra_gradient_descent_comparison.ipynb\": 310298},\"datasets\": {\"lifesat\": {\"::meta::\": {\"size\": \"446101\",\"htmlId\": \"files42345.85304457511\"},\"::files::\": {\"oecd_bli_2015.csv\": 405467,\"gdp_per_capita.csv\": 36323,\"README.md\": 4311}},\"housing\": {\"::meta::\": {\"size\": \"1836697\",\"htmlId\": \"files181989.62961963034\"},\"::files::\": {\"housing.tgz\": 409488,\"housing.csv\": 1423529,\"README.md\": 3680}},\"::meta::\": {\"size\": \"2314472\",\"htmlId\": \"files103471.41376291963\"},\"inception\": {\"::meta::\": {\"size\": \"31674\",\"htmlId\": \"files455029.7341813495\"},\"::files::\": {\"imagenet_class_names.txt\": 31674}},\"::files::\": {}},\".idea\": {\"inspectionProfiles\": {\"::meta::\": {\"size\": \"174\",\"htmlId\": \"files897942.30719681\"},\"::files::\": {\"profiles_settings.xml\": 174}},\"::meta::\": {\"size\": \"4006\",\"htmlId\": \"files694101.3734451451\"},\"::files::\": {\"misc.xml\": 317,\"modules.xml\": 293,\"rSettings.xml\": 151,\"workspace.xml\": 2724,\"handson-ml-master.iml\": 347}},\"docker\": {\"bin\": {\"::meta::\": {\"size\": \"7749\",\"htmlId\": \"files59100.62552796881\"},\"::files::\": {\"tensorboard\": 44,\"rm_empty_subdirs\": 2136,\"nbdiff_checkpoint\": 583,\"nbclean_checkpoints\": 4986}},\"::meta::\": {\"size\": \"15819\",\"htmlId\": \"files117812.95671947527\"},\"::files::\": {\"Dockerfile\": 3431,\"docker-compose.yml\": 507,\"Makefile\": 260,\".env\": 32,\"bashrc.bash\": 89,\"jupyter_notebook_config.py\": 691,\"README.md\": 3060}}}}");
        });

        app.get("/getProcessId", ctx ->{
            ctx.setResponseType(MediaType.json);
            long pid = ProcessHandle.current().pid();
            return new JSONObject("{\"pid\": " + pid + "}");
        });

        app.start();

        System.out.println("Backend Started");
    }
}

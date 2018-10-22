import * as protos from "@dataform/protos";
import * as runners from "./runners";
import { Executor } from "./executor";
import * as builder from "./builder";

import compile from "./commands/compile";
import init from "./commands/init";
import install from "./commands/install";
import * as query from "./commands/query";

export { compile, init, install, query, Executor };

export function run(
  graph: protos.IExecutionGraph,
  profile: protos.IProfile
): Executor {
  var executor = Executor.create(
    runners.create(profile, graph.projectConfig.warehouse),
    graph
  );
  executor.execute();
  return executor;
}

export function build(
  compiledGraph: protos.ICompiledGraph,
  runConfig?: protos.IRunConfig
): protos.IExecutionGraph {
  return builder.build(compiledGraph, runConfig);
}

export function tables(profile: protos.IProfile): Promise<protos.ITarget[]> {
  return runners.create(profile).tables();
}

export function table(
  profile: protos.IProfile,
  target: protos.ITarget
): Promise<protos.ITable> {
  return runners.create(profile).schema(target);
}
